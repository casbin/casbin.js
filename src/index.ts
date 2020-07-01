import axios from 'axios';
import Profiles from './profiles';

interface BaseResponse {
    message: string;
    data: any;
}

export class Authorizer {
    private endpoint: string | undefined;
    private user : string | undefined;
    private profiles = new Profiles();

    public constructor(endpoint?: string) {
        this.endpoint = endpoint;
    }

    /**
     * Get the profiles.
     */
    public getProfiles() : {[key: string]: string[]} {
        return this.profiles.getProfilesJson();
    }

    public setProfiles(jsonProfiles : string) : void{
        this.profiles.loadFromString(jsonProfiles);
    }

    /**
     * Get the authority of a given user from Casbin core
     */
    public async syncUserProfiles(): Promise<void> {
        if (this.endpoint !== undefined) {
            const resp = await axios.get<BaseResponse>(`${this.endpoint}?casbin_subject=${this.user}`);
            this.profiles.loadFromString(resp.data.data);
            console.log("syncUserProfiles is called")
        }
    }

    /**
     * Set the user subject for the authroizer
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
        for (let i = 0; i < objects.length; ++i) {
            if (!this.profiles.check(action, objects[i])) {
                return false;
            }
        }
        return true;
    }

    public canAny(action: string, objects: Array<string>) : boolean {
        for (let i = 0; i < objects.length; ++i) {
            if (this.profiles.check(action, objects[i])) {
                return true;
            }
        }
        return false;
    }

}
