import { Authorizer } from "../Authorizer";
import { rbacModelStr, rbacWithDomainsModelStr } from './models';

// A user with several roles at once, plus a role that inherits from another role.
const multiRoleData = {
    m: rbacModelStr,
    p: [
        ["p", "admin", "data1", "read"],
        ["p", "editor", "data2", "write"],
        ["p", "root", "data3", "read"],
    ],
    g: [
        ["g", "alice", "admin"],
        ["g", "alice", "editor"],
        ["g", "admin", "root"],
        ["g", "bob", "editor"],
    ],
};

test('A user holding several roles gets the permissions of all of them', async () => {
    const authorizer = new Authorizer("manual");
    authorizer.setPermission(multiRoleData);
    await authorizer.setUser("alice");

    // From "admin", from "editor" and from "root" which "admin" inherits.
    expect(await authorizer.can("read", "data1")).toBe(true);
    expect(await authorizer.can("write", "data2")).toBe(true);
    expect(await authorizer.can("read", "data3")).toBe(true);
    expect(await authorizer.can("write", "data1")).toBe(false);

    // Only "editor", so neither the "admin" nor the inherited "root" permissions.
    await authorizer.setUser("bob");
    expect(await authorizer.can("write", "data2")).toBe(true);
    expect(await authorizer.can("read", "data1")).toBe(false);
    expect(await authorizer.can("read", "data3")).toBe(false);
});

test('The roles of a user are listed, the inherited ones included', async () => {
    const authorizer = new Authorizer("manual");
    authorizer.setPermission(multiRoleData);
    await authorizer.setUser("alice");

    expect((await authorizer.getRoles()).sort()).toEqual(["admin", "editor", "root"]);
    expect(await authorizer.getImplicitPermissions()).toEqual(expect.arrayContaining([
        ["admin", "data1", "read"],
        ["editor", "data2", "write"],
        ["root", "data3", "read"],
    ]));
});

test('A user holding several roles in several domains', async () => {
    const authorizer = new Authorizer("manual");
    authorizer.setPermission({
        m: rbacWithDomainsModelStr,
        p: [
            ["p", "admin", "domain1", "data1", "read"],
            ["p", "editor", "domain1", "data2", "write"],
            ["p", "admin", "domain2", "data3", "read"],
        ],
        g: [
            ["g", "alice", "admin", "domain1"],
            ["g", "alice", "editor", "domain1"],
            ["g", "alice", "admin", "domain2"],
        ],
    });
    await authorizer.setUser("alice");

    expect(await authorizer.can("read", "data1", "domain1")).toBe(true);
    expect(await authorizer.can("write", "data2", "domain1")).toBe(true);
    expect(await authorizer.can("read", "data3", "domain2")).toBe(true);
    // The roles of a domain do not leak into another one.
    expect(await authorizer.can("read", "data1", "domain2")).toBe(false);
    expect((await authorizer.getRoles("domain1")).sort()).toEqual(["admin", "editor"]);
    expect(await authorizer.getRoles("domain2")).toEqual(["admin"]);
});

test('Setting the permission again replaces the former one', async () => {
    const authorizer = new Authorizer("manual");
    authorizer.setPermission({ "read": ["data1", "data2"], "write": ["data1"] });
    expect(await authorizer.can("write", "data1")).toBe(true);

    authorizer.setPermission({ "read": ["data1"] });
    expect(await authorizer.can("read", "data1")).toBe(true);
    expect(await authorizer.can("read", "data2")).toBe(false);
    expect(await authorizer.can("write", "data1")).toBe(false);
});

test('Switching from the model and policies back to an action map', async () => {
    const authorizer = new Authorizer("manual");
    authorizer.setPermission(multiRoleData);
    await authorizer.setUser("alice");
    expect(await authorizer.can("read", "data1")).toBe(true);

    authorizer.setPermission({ "read": ["data2"] });
    expect(await authorizer.can("read", "data1")).toBe(false);
    expect(await authorizer.can("read", "data2")).toBe(true);
});

test('Evaluating without a user is an error instead of a silent denial', async () => {
    const authorizer = new Authorizer("manual");
    authorizer.setPermission(multiRoleData);
    await expect(authorizer.can("read", "data1")).rejects.toThrow(/User is not defined/);
});

test('Roles are unavailable when the permission is a plain action map', async () => {
    const authorizer = new Authorizer("manual");
    authorizer.setPermission({ "read": ["data1"] });
    await authorizer.setUser("alice");
    await expect(authorizer.getRoles()).rejects.toThrow(/Enforcer not initialized/);
});
