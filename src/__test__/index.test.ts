import axios from 'axios';
import Cookies from 'js-cookie'
import { Authorizer } from '../index';
import { basicModelStr } from './models';
import { basicPolicies } from './policies';
import { removeLocalStorage } from '../Cache';
import TestServer  from './server';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('Mock functions', () => {
    const respObj = {
        m: basicModelStr,
        p: basicPolicies
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

async function check(authorizer: Authorizer) {
    // can
    expect(await authorizer.can('read', 'data1')).toBe(true);
    expect(await authorizer.can('read', 'data4')).toBe(false);
    expect(await authorizer.can('write', 'data1')).toBe(false);
    // cannot
    expect(await authorizer.cannot('read', 'data4')).toBe(true);
    expect(await authorizer.cannot('read', 'data1')).toBe(false);
    // canAll
    expect(await authorizer.canAll('read', ['data1', 'data2'])).toBe(true);
    expect(await authorizer.canAll('write', ['data1', 'data2'])).toBe(false);
    expect(await authorizer.canAll('read', ['data1', 'data2', 'data4'])).toBe(false);
    // canAny
    expect(await authorizer.canAny('read', ['data1', 'data2'])).toBe(true);
    expect(await authorizer.canAny('write', ['data1', 'data2'])).toBe(true);
    expect(await authorizer.canAny('read', ['data1', 'data2', 'data4'])).toBe(true);
    expect(await authorizer.canAny('read', ['data4'])).toBe(false);
}

const permissionObj = {
    read: ['data1', 'data2'],
    write: ['data2']
}

// test('Cookies mode', () => {
//     const permissionObj = {
//         read: ['data1', 'data2', 'data3'],
//         write: ['data1']
//     }
//     const cookieKey = 'test_perm'
//     Cookies.set('test_perm', JSON.stringify(permissionObj));
//     const authorizer = new Authorizer('cookies', {cookieKey: cookieKey});
//     check(authorizer);
// })

test('Manual mode', () => {
    const authorizer = new Authorizer('manual');
    authorizer.setPermission(permissionObj);
    check(authorizer);
})


test('Auto mode', async () => {
    const respData = JSON.stringify({
        m: basicModelStr,
        p: basicPolicies,
    });
    const authorizer = new Authorizer("auto", {endpoint: "whatever"});
    removeLocalStorage('alice');
    await authorizer.initEnforcer(respData);
    authorizer.user = "alice";
    await check(authorizer);
})

describe('Auto mode with server', () => {
    let server: TestServer;
    beforeAll(async () => {
        server = new TestServer();
        await server.start();
    });

    test('Request for /api/casbin', async () => {
        removeLocalStorage('alice');
        const authorizer = new Authorizer('auto', { endpoint: 'http://localhost:4000/api/casbin'});
        await authorizer.setUser('alice');
        await check(authorizer);
    });

    afterAll(() => server.terminate());
});
