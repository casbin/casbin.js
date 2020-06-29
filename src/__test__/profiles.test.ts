import Profiles from '../profiles';
describe('Profiles unit test', () => {
    const policyExample = {
        'read': ['data1', 'data2'],
        'write': ['data2']
    }
    const profiles = new Profiles();

    // From https://stackoverflow.com/a/57428906/7409994
    const expectArrayEquivalence = <T>(actual: T[], expected: T[]) => {
        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(expected).toEqual(expect.arrayContaining(actual));
      };
    
    test('Load profiles from JSON string', () => {
        const s = JSON.stringify(policyExample);
        // let profiles : Profiles = new Profiles();
        profiles.loadFromString(s);
        const t = profiles.getProfilesString();
        expect(JSON.parse(t)).toMatchObject(policyExample);
    })

    test('Get targets from an action', () => {
        profiles.loadFromString(JSON.stringify(policyExample));
        expectArrayEquivalence<string>(profiles.getTargetsFromAction('read'), policyExample['read']);
        expectArrayEquivalence<string>(profiles.getTargetsFromAction('write'), policyExample['write']);
        // ?: The following implementation doesn't work. Help wanted.
        // ['read', 'write'].forEach((item :string) => {
        //     expectArrayEquivalence<string>(profiles.getTargetsFromAction(item), policyExample[item]);
        // })
    })

    test('Get action-object mapping', () => {
        // TODO
    });
    
    test('Get object-action mapping', () => {
        // TODO
    })

})
