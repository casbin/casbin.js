/**
 * @jest-environment node
 */

import { Enforcer } from '../index';
import TestServer from './server';

describe('Communication with server', () => {
    let server: TestServer;
    beforeAll(async () => {
        server = new TestServer();
        await server.start();
    });

    test('Get data from server', async () => {
        const enforcer = new Enforcer('http://localhost:4000');
        const data = await enforcer.getData();
        expect(data).toBe('this is the data');
    });

    test('Request for /api/casbin', async () => {
        const enforcer = new Enforcer('http://localhost:4000/api/casbin?casbin_subject=alice');
        const respData = await enforcer.getData();
        const data = JSON.parse(respData);
        expect(data).toMatchObject({
            read: ['data1', 'data2'],
            write: ['data2']
        })
    });

    afterAll(() => server.terminate());
});
