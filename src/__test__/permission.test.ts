import Permission from '../permission';
describe('Permission unit test', () => {
    const policyExample = {
        'read': ['data1', 'data2'],
        'write': ['data2']
    }
    const permission = new Permission();

    // From https://stackoverflow.com/a/57428906/7409994
    const expectArrayEquivalence = <T>(actual: T[], expected: T[]) => {
        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(expected).toEqual(expect.arrayContaining(actual));
      };
    
    test('Load permission from JSON string', () => {
        const s = JSON.stringify(policyExample);\
        permission.loadFromString(s);
        const t = permission.getPermissionString();
        expect(JSON.parse(t)).toMatchObject(policyExample);
    })

    test('Get targets from an action', () => {
        permission.loadFromString(JSON.stringify(policyExample));
        expectArrayEquivalence<string>(permission.getTargetsFromAction('read'), policyExample['read']);
        expectArrayEquivalence<string>(permission.getTargetsFromAction('write'), policyExample['write']);
        // ?: The following implementation doesn't work. Help wanted.
        // ['read', 'write'].forEach((item :string) => {
        //     expectArrayEquivalence<string>(permission.getTargetsFromAction(item), policyExample[item]);
        // })
    })

    test('Get action-object mapping', () => {
        // TODO
    });
    
    test('Get object-action mapping', () => {
        // TODO
    })

})
