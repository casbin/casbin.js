import { Enforcer, newEnforcer, newModel, newSyncedEnforcer, SyncedEnforcer } from '../src';

function testEnforce(e: Enforcer, sub: any, obj: string, act: string, res: boolean): void {
  expect(e.enforceSync(sub, obj, act)).toBe(res);
}

async function waitLock(e: SyncedEnforcer): Promise<void> {
  await e.lock.acquireAsync();
  e.lock.release();
}

test('TestRBACModelInMemoryWithEnforceSync', async () => {
  const m = newModel();
  m.addDef('r', 'r', 'sub, obj, act');
  m.addDef('p', 'p', 'sub, obj, act');
  m.addDef('g', 'g', '_, _');
  m.addDef('e', 'e', 'some(where (p.eft == allow))');
  m.addDef('m', 'm', 'g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act');

  const e = await newSyncedEnforcer(m);

  await e.addPermissionForUser('alice', 'data1', 'read');
  await e.addPermissionForUser('bob', 'data2', 'write');
  await e.addPermissionForUser('data2_admin', 'data2', 'read');
  await e.addPermissionForUser('data2_admin', 'data2', 'write');
  await e.addRoleForUser('alice', 'data2_admin');
  await waitLock(e);

  testEnforce(e, 'alice', 'data1', 'read', true);
  testEnforce(e, 'alice', 'data1', 'write', false);
  testEnforce(e, 'alice', 'data2', 'read', true);
  testEnforce(e, 'alice', 'data2', 'write', true);
  testEnforce(e, 'bob', 'data1', 'read', false);
  testEnforce(e, 'bob', 'data1', 'write', false);
  testEnforce(e, 'bob', 'data2', 'read', false);
  testEnforce(e, 'bob', 'data2', 'write', true);

  await e.deletePermissionForUser('alice', 'data1', 'read');
  await e.deletePermissionForUser('bob', 'data2', 'write');
  await e.deletePermissionForUser('data2_admin', 'data2', 'read');
  await e.deletePermissionForUser('data2_admin', 'data2', 'write');
  await waitLock(e);

  testEnforce(e, 'alice', 'data1', 'read', false);
  testEnforce(e, 'alice', 'data1', 'write', false);
  testEnforce(e, 'alice', 'data2', 'read', false);
  testEnforce(e, 'alice', 'data2', 'write', false);
  testEnforce(e, 'bob', 'data1', 'read', false);
  testEnforce(e, 'bob', 'data1', 'write', false);
  testEnforce(e, 'bob', 'data2', 'read', false);
  testEnforce(e, 'bob', 'data2', 'write', false);

  await e.addPermissionForUser('bob', 'data2', 'write');
  await e.addPermissionForUser('data2_admin', 'data2', 'read');
  await e.addPermissionForUser('data2_admin', 'data2', 'write');
  await e.addRoleForUser('alice', 'data2_admin');
  await waitLock(e);

  testEnforce(e, 'alice', 'data2', 'read', true);
  testEnforce(e, 'alice', 'data2', 'write', true);
  testEnforce(e, 'bob', 'data2', 'read', false);
  testEnforce(e, 'bob', 'data2', 'write', true);

  await e.deletePermission('data2', 'write');
  await waitLock(e);

  testEnforce(e, 'alice', 'data2', 'read', true);
  testEnforce(e, 'alice', 'data2', 'write', false);
  testEnforce(e, 'bob', 'data2', 'read', false);
  testEnforce(e, 'bob', 'data2', 'write', false);

  await e.addPermissionForUser('bob', 'data2', 'write');
  await e.addPermissionForUser('data2_admin', 'data2', 'read');
  await e.addPermissionForUser('data2_admin', 'data2', 'write');
  await waitLock(e);

  testEnforce(e, 'alice', 'data2', 'read', true);
  testEnforce(e, 'alice', 'data2', 'write', true);
  testEnforce(e, 'bob', 'data2', 'read', false);
  testEnforce(e, 'bob', 'data2', 'write', true);

  await e.deletePermissionsForUser('data2_admin');
  await waitLock(e);

  testEnforce(e, 'alice', 'data2', 'read', false);
  testEnforce(e, 'alice', 'data2', 'write', false);
  testEnforce(e, 'bob', 'data2', 'read', false);
  testEnforce(e, 'bob', 'data2', 'write', true);
});
