import axios from 'axios';
import Profiles from './profiles';

interface BaseResponse {
    message: string;
    data: any;
}

export class Enforcer {
    private endpoint: string;
    private user : string | undefined;
    private profiles = new Profiles();

    public constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    /**
     * Get the profiles.
     */
    public getProfiles() : {[key: string]: string[]} {
        return this.profiles.getProfilesJson();
    }

    /**
     * Get the authority of a given user from Casbin core
     */
    public async syncUserProfiles(): Promise<void> {
        const resp = await axios.get<BaseResponse>(`${this.endpoint}?casbin_subject=${this.user}`);
        this.profiles.loadFromString(resp.data.data);
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

    public can(action: string, object: string): boolean {
        return this.profiles.check(action, object);
    }

    public cannot(action: string, object: string): boolean {
        return !this.profiles.check(action, object);
    }

    public canAll(action: string, objects: Array<string>) : boolean {
        objects.forEach(object => {
            if (!this.profiles.check(action, object)) {
                return false;
            }
        })
        return true;
    }

    public canAny(action: string, objects: Array<string>) : boolean {
        objects.forEach(object => {
            if (this.profiles.check(action, object)) {
                return true;
            }
        })
        return false;
    }

}
