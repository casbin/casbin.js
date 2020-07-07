import Permission from '../permission';
describe('Permission unit test', () => {
    const policyExample = {
        'read': ['data1', 'data2'],
        'write': ['data2']
    }
    const permission = new Permission();

    test('Load permission from JSON string', () => {
        const s = JSON.stringify(policyExample);
        permission.loadFromString(s);
        const t = permission.getPermissionString();
        expect(JSON.parse(t)).toMatchObject(policyExample);
    })

    test('Get targets from an action', () => {
        permission.loadFromString(JSON.stringify(policyExample));

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
