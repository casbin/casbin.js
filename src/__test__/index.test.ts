import axios from 'axios';
import Cookies from 'js-cookie'
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
    // expect(authorizer.getPermission()).toMatchObject(respObj);

    // expect(mockedAxios.get('http://localhost:4000/api/casbin?casbin_subject=alice')).toMatchObject(respObj);
});

const permissionObj = {
    read: ['data1', 'data2', 'data3'],
    write: ['data1']
}

function check(authorizer: Authorizer) {
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
}

test('Cookies mode', () => {
    const permissionObj = {
        read: ['data1', 'data2', 'data3'],
        write: ['data1']
    }
    const cookieKey = 'test_perm'
    Cookies.set('test_perm', JSON.stringify(permissionObj));
    const authorizer = new Authorizer('cookies', {cookieKey: cookieKey});
    check(authorizer);
})

test('Manual mode', () => {
    const authorizer = new Authorizer('manual');
    authorizer.setPermission(permissionObj);
    check(authorizer);
})
