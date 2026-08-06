import Permission from '../Permission';

describe('Permission unit test', () => {
    const permExample = {
        'read': ['data1', 'data2'],
        'write': ['data2']
    }
    const permission = new Permission();

    test('Load permission from JSON object', () => {
        const s = JSON.stringify(permExample);
        permission.load(permExample);
        const t = permission.getPermissionJsonObject();
        expect(t).toMatchObject(permExample);
    })

    test('Load permission from JSON string', () => {
        const s = JSON.stringify(permExample);
        permission.load(s);
        const t = permission.getPermissionString();
        expect(JSON.parse(t)).toMatchObject(permExample);
    })

    test('Get targets from an action', () => {
        permission.load(permExample);

        let expected = permExample['read'];
        let actual = permission.getTargetsFromAction('read');
        expect(actual.sort()).toEqual(expected.sort());

        expected = permExample['write'];
        actual = permission.getTargetsFromAction('write');
        expect(actual.sort()).toEqual(expected.sort());

    })

    test('Get action-object mapping', () => {
        permission.load(permExample);
        const actual = permission.getActionsObjects();
        expect(actual.get('read')).toEqual(['data1', 'data2']);
        expect(actual.get('write')).toEqual(['data2']);
    });

    test('Get object-action mapping', () => {
        permission.load(permExample);
        const actual = permission.getObjectsActions();
        expect(actual.get('data1')).toEqual(['read']);
        expect(actual.get('data2')).toEqual(['read', 'write']);
    })

})
