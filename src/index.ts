import axios from 'axios';
import Permission from './permission';
import { StringKV } from './types';

interface BaseResponse {
    message: string;
    data: any;
}

export class Authorizer {
    private endpoint: string | undefined;
    private user : string | undefined;
    private permission = new Permission();

    public constructor(endpoint?: string) {
        this.endpoint = endpoint;
    }

    /**
     * Get the permission.
     */
    public getPermission() : StringKV {
        return this.permission.getPermissionJson();
    }

    public setPermission(permission : object | string) : void{
        this.permission.load(permission);
    }

    /**
     * Get the authority of a given user from Casbin core
     */
    public async syncUserPermission(): Promise<void> {
        if (this.endpoint !== undefined) {
            const resp = await axios.get<BaseResponse>(`${this.endpoint}?casbin_subject=${this.user}`);
            this.permission.load(resp.data.data);
            console.log("syncUserPermission is called")
        }
    }

    /**
     * Set the user subject for the authroizer
     * @param user The current user
     */
    public async setUser(user : string) : Promise<void> {
        // Sync with the server and fetch the latest permission of the new user
        if (user != this.user) {
            this.user = user;
            await this.syncUserPermission()
        }        
    }

    public can(action: string, object: string): boolean {
        return this.permission.check(action, object);
    }

    public cannot(action: string, object: string): boolean {
        return !this.permission.check(action, object);
    }

    public canAll(action: string, objects: Array<string>) : boolean {
        for (let i = 0; i < objects.length; ++i) {
            if (!this.permission.check(action, objects[i])) {
                return false;
            }
        }
        return true;
    }

    public canAny(action: string, objects: Array<string>) : boolean {
        for (let i = 0; i < objects.length; ++i) {
            if (this.permission.check(action, objects[i])) {
                return true;
            }
        }
        return false;
    }

}
