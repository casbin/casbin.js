import axios from 'axios';
import { Enforcer } from '../index';

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
    // const enforcer = new Enforcer('http://localhost:4000');
    // enforcer.setUser('alice');
    // expect(enforcer.getProfiles()).toMatchObject(respObj);

    // expect(mockedAxios.get('http://localhost:4000/api/casbin?casbin_subject=alice')).toMatchObject(respObj);
});
