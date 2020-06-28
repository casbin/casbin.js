/**
 * @jest-environment node
 */

import { Enforcer } from '../index';
import TestServer from './server';
import Axios from 'axios';

describe('Communication with server', () => {
    let server: TestServer;
    beforeAll(async () => {
        server = new TestServer();
        await server.start();
    });

    test('Request for /api/casbin', async () => {
        const enforcer = new Enforcer('http://localhost:4000/api/casbin');
        await enforcer.setUser('alice');
        expect(enforcer.getProfiles()).toMatchObject({
            read: ['data1', 'data2'],
            write: ['data2']
        })
    });

    afterAll(() => server.terminate());
});
