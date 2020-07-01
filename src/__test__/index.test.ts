import axios from 'axios';
import { Authorizer } from '../index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('Mock functions', async () => {
    const respObj = {
        read: ['data1', 'data2'],
        write: ['data2']
    }
    const resp = { data: { message: 'ok', data: JSON.stringify(respObj)}};
    // Specify the returned data of the mockedAxios once
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(resp));
    // TODO: Use mock function to get response object
    // const authorizer = new Authorizer('http://localhost:4000');
    // authorizer.setUser('alice');
    // expect(authorizer.getProfiles()).toMatchObject(respObj);

    // expect(mockedAxios.get('http://localhost:4000/api/casbin?casbin_subject=alice')).toMatchObject(respObj);
});

test('Authorizer', () => {
    const profilesObj = {
        read: ['data1', 'data2', 'data3'],
        write: ['data1']
    }
    const authorizer = new Authorizer();
    authorizer.setProfiles(JSON.stringify(profilesObj));
    // can
    expect(authorizer.can('read', 'data1')).toBe(true);
    expect(authorizer.can('read', 'data4')).toBe(false);
    expect(authorizer.can('write', 'data1')).toBe(true);
    // cannot
    expect(authorizer.cannot('read', 'data4')).toBe(true);
    expect(authorizer.cannot('read', 'data3')).toBe(false);
    // canAll
    expect(authorizer.canAll('read', ['data1', 'data2'])).toBe(true);
    expect(authorizer.canAll('write', ['data1', 'data2'])).toBe(false);
    expect(authorizer.canAll('read', ['data1', 'data2', 'data4'])).toBe(false);
    // canAny
    expect(authorizer.canAny('read', ['data1', 'data2'])).toBe(true);
    expect(authorizer.canAny('write', ['data1', 'data2'])).toBe(true);
    expect(authorizer.canAny('read', ['data1', 'data2', 'data4'])).toBe(true);
    expect(authorizer.canAny('read', ['data4'])).toBe(false);
})