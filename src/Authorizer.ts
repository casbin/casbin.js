import axios from 'axios';
import Cookies from 'js-cookie';
import Permission from './Permission';
import { StringKV } from './types';

interface BaseResponse {
    message: string;
    data: any;
}

type Mode = "auto" | "cookies" | "manual"

export class Authorizer {
    private mode!: Mode;
    private endpoint: string | undefined = undefined;
    private user : string | undefined;
    private permission = new Permission();
    private cookieKey : string | undefined = undefined;

    /**
     * 
     * @param mode "auto", "cookies" or "manual"
     * "auto": Specify the casbin server endpoint, and Casbin.js will load permission from it when the identity changes
     * "cookies": Casbin.js load the permission data from the cookie "casbin_permission" or the specified cookie key.
     * "manual": Load the permission mannually with "setPermission"
     * @param args.endpoint Casbin service endpoint, required when mode == "auto"
     * @param args.cookieKey The cookie key when loading permission, activated when mode == "cookies"
     */
    constructor(mode: Mode, args: {endpoint?: string, cookieKey?: string} = {}) {
        if (mode == 'auto') {
            if (!args.endpoint) {
                throw new Error("Specify the endpoint when initializing casbin.js with mode == 'auto'");
                return;
            } else {
                this.mode = mode;
                this.endpoint = args.endpoint;
            }
        } else if (mode == 'cookies') {
            this.mode = mode;
            let permission = Cookies.get(args.cookieKey ? args.cookieKey : "casbin_perm");
            if (permission) {
                this.setPermission(permission);
            } else {
                console.log("WARNING: No specified cookies");
            }
        } else if (mode == 'manual') {
            this.mode = mode;
        } else {
            throw new Error("Casbin.js mode can only be one of the 'auto', 'cookies' and 'manual'");
        }
    }

    /**
     * Get the permission.
     */
    public getPermission() : StringKV {
        return this.permission.getPermissionJson();
    }

    public setPermission(permission : Record<string, unknown> | string) : void{
        this.permission.load(permission);
    }

    /**
     * Get the authority of a given user from Casbin core
     */
    private async syncUserPermission(): Promise<void> {
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
        if (this.mode == 'auto' && user != this.user) {
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
