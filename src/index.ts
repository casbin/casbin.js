import axios from 'axios';

interface BaseResponse {
    message: string;
    data: any;
}

export class Enforcer {
    private profiles = '';
    private endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    /**
     * Get the authority of a given user from Casbin core
     */
    private async getUserProfiles(user: string): Promise<void> {
        throw new Error('Not implemented');
    }

    /**
     * To enforce if the user have the authority to perform `act` on `obj`
     */
    public async enforce(obj: string, act: string): Promise<void> {
        throw new Error('Not implemented');
    }

    public async getData(): Promise<any> {
        const resp = await axios.get<BaseResponse>(this.endpoint);
        return resp.data.data;
    }
}
