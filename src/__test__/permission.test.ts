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
        // TODO
    });
    
    test('Get object-action mapping', () => {
        // TODO
    })

})
