import Permission from '../Permission';

describe('Permission unit test', () => {
    const policyExample = {
        'read': ['data1', 'data2'],
        'write': ['data2']
    }
    const permission = new Permission();

    test('Load permission from JSON object', () => {
        const s = JSON.stringify(policyExample);
        permission.load(policyExample);
        const t = permission.getPermissionJson();
        expect(t).toMatchObject(policyExample);
    })

    test('Load permission from JSON string', () => {
        const s = JSON.stringify(policyExample);
        permission.load(s);
        const t = permission.getPermissionString();
        expect(JSON.parse(t)).toMatchObject(policyExample);
    })

    test('Get targets from an action', () => {
        permission.load(policyExample);

        let expected = policyExample['read'];
        let actual = permission.getTargetsFromAction('read');
        expect(actual.sort()).toEqual(expected.sort());

        expected = policyExample['write'];
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
