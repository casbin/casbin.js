/**
 * @jest-environment node
 */

import { Authorizer } from '../index';
import TestServer from './server';
import Axios from 'axios';

describe('Auto mode', () => {
    let server: TestServer;
    beforeAll(async () => {
        server = new TestServer();
        await server.start();
    });

    test('Request for /api/casbin', async () => {
        const authorizer = new Authorizer('auto', { endpoint: 'http://localhost:4000/api/casbin'});
        await authorizer.setUser('alice');
        expect(authorizer.getPermission()).toMatchObject({
            read: ['data1', 'data2'],
            write: ['data2']
        })
    });

    afterAll(() => server.terminate());
});
