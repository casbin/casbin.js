import axios from 'axios';

interface BaseResponse {
    message: string;
    data: any;
}

export class Enforcer {
    private endpoint: string;
    private user : string | undefined;
    private profiles: {[key: string]: string[]} = {};

    public constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    /**
     * Get the profiles.
     */
    public getProfiles() : {[key: string]: string[]} {
        return this.profiles;
    }

    /**
     * Get the authority of a given user from Casbin core
     */
    public async syncUserProfiles(): Promise<void> {
        const resp = await axios.get<BaseResponse>(`${this.endpoint}?casbin_subject=${this.user}`);
        this.profiles = JSON.parse(resp.data.data);
        console.log("syncUserProfiles is called")
    }

    /**
     * Set the user subject for the enforcer
     * @param user The current user
     */
    public async setUser(user : string) : Promise<void> {
        // Sync with the server and fetch the latest profiles of the new user
        if (user != this.user) {
            this.user = user;
            await this.syncUserProfiles()
        }        
    }

    /**
     * To enforce if the user have the authority to perform `act` on `obj`
     */
    public async enforce(obj: string, act: string): Promise<void> {
        throw new Error('Not implemented');
    }

}
