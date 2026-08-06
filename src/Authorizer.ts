import * as casbin from 'casbin-core';
import Permission from './Permission';
import { StringKV } from './types';
import * as Cache from './Cache';

interface BaseResponse {
    message: string;
    data: any;
}

type Mode = "auto" | "cookies" | "manual"

/**
 * Whether the object is the model + policies produced by casbin's
 * "CasbinJsGetPermissionForUser", rather than an action-to-objects map.
 */
function isEnforcerData(obj: unknown): obj is Record<string, unknown> {
    return typeof obj === 'object' && obj !== null && typeof (obj as Record<string, unknown>)['m'] === 'string';
}

export class Authorizer {
    public mode!: Mode;
    public endpoint: string | undefined = undefined;
    public requestHeaders: StringKV | undefined = undefined;
    public permission: Permission | undefined;
    public cookieKey : string | undefined = undefined;
    public cacheExpiredTime  = 60; // Seconds
    public user : string | undefined;
    public enforcer:casbin.Enforcer | undefined;
    private enforcerPromise: Promise<void> | undefined;

    /**
     *
     * @param mode "auto", "cookies" or "manual"
     * "auto": Specify the casbin server endpoint, and Casbin.js will load permission from it when the identity changes
     * "cookies": Casbin.js load the permission data from the cookie "access_perm" or the specified cookie key.
     * "manual": Load the permission mannually with "setPermission"
     * @param args
     * @param args.endpoint Casbin service endpoint, REQUIRED when mode == "auto"
     * @param args.cacheExpiredTime The expired time of local cache, Unit: seconds, Default: 60s, activated when mode == "auto"
     * @param args.cookieKey The cookie key when loading permission, activated when mode == "cookies"
     */
    constructor(mode: Mode = 'manual', args: { endpoint?: string; cacheExpiredTime?: number; requestHeaders?: StringKV } = {}) {
        if (mode == 'auto') {
            if (!args.endpoint) {
                throw new Error("Specify the endpoint when initializing casbin.js with mode == 'auto'");
            } else {
                this.mode = mode;
                this.endpoint = args.endpoint;
                if (args.requestHeaders) {
                    this.requestHeaders = args.requestHeaders;
                }
                if (args.cacheExpiredTime !== null && args.cacheExpiredTime !== undefined) {
                    this.cacheExpiredTime = args.cacheExpiredTime;
                }
            }
        } else if (mode == 'cookies') {
            throw Error("Cookie mode not implemented.");
            /*
            this.mode = mode;
            const permission = Cookies.get(args.cookieKey ? args.cookieKey : "access_perm");
            if (permission) {
                this.setPermission(permission);
            } else {
                console.log("WARNING: No specified cookies");
            }
            */
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
        if (this.permission !== undefined) {
            return this.permission?.getPermissionJsonObject();
        } else {
            throw Error("Permission is not defined. Are you using manual mode and have set the permission?");
            return {} as StringKV;
        }
    }

    /**
     * Load the permission data.
     *
     * Two shapes are accepted:
     * - A map of actions to objects, e.g. {"read": ["data1", "data2"], "write": ["data1"]}
     * - The model and policies returned by casbin's "CasbinJsGetPermissionForUser"
     *   (a JSON object with the keys "m", "p" and "g"). In this case an enforcer is
     *   built from that data, and "can" evaluates the model instead of a static map.
     */
    public setPermission(permission : Record<string, unknown> | string) : void{
        const obj = typeof permission === 'string' ? JSON.parse(permission) : permission;
        if (isEnforcerData(obj)) {
            this.enforcerPromise = this.initEnforcer(obj);
            // The rejection is surfaced when "can" awaits the promise, this only
            // keeps it from being reported as an unhandled rejection meanwhile.
            this.enforcerPromise.catch(() => undefined);
            return;
        }
        if (this.permission === undefined) {
            this.permission = new Permission();
        }
        this.permission.load(obj);
    }

    public async initEnforcer(s: string | Record<string, unknown>): Promise<void> {
        const obj = typeof s === 'string' ? JSON.parse(s) : s;
        if (!('m' in obj)) {
            throw Error("No model when init enforcer.");
        }
        const m = new casbin.Model(obj['m']);
        this.enforcer = await casbin.newEnforcer(m);
        // "CasbinJsGetPermissionForUser" puts the policies under "p" and the grouping
        // policies under "g", each rule prefixed with its own ptype.
        for (const section of ['p', 'g']) {
            if (section in obj) {
                await this.loadRules(obj[section]);
            }
        }
    }

    private async loadRules(rules: unknown): Promise<void> {
        if (!Array.isArray(rules)) {
            return;
        }
        for (const rule of rules) {
            if (!Array.isArray(rule)) {
                continue;
            }
            const arr = (rule as string[]).map(v => v.trim());
            const pType = arr.shift();
            if (!pType) {
                continue;
            }
            if (pType.startsWith('g')) {
                await (this.enforcer as casbin.Enforcer).addNamedGroupingPolicy(pType, ...arr);
            } else {
                await (this.enforcer as casbin.Enforcer).addNamedPolicy(pType, ...arr);
            }
        }
    }

    /**
     * Initialize the enforcer
     */
    public async getEnforcerDataFromSvr(): Promise<string>{
        if (this.endpoint === undefined || this.endpoint === null) {
            throw Error("Endpoint is null or not specified.");
        }
        const resp = await fetch(`${this.endpoint}?subject=${this.user}`, {
            headers: this.requestHeaders as unknown as HeadersInit,
        });
        if (!resp.ok) {
            throw new Error(`HTTP error: ${resp.status}`);
        }
        const body: BaseResponse = await resp.json();
        return body.data;
    }

    /**
     * Set the user subject for the authroizer
     * @param user The current user
     */
    public async setUser(user : string) : Promise<void> {
        if (user === this.user) {
            return;
        }
        this.user = user;
        if (this.mode == 'auto') {
            let config = Cache.loadFromLocalStorage(user);
            if (config === null) {
                config = await this.getEnforcerDataFromSvr();
                Cache.saveToLocalStorage(user, config, this.cacheExpiredTime);
            }
            await this.initEnforcer(config);
        }
    }

    public async can(action: string, object: string, domain?: string): Promise<boolean> {
        if (this.enforcerPromise !== undefined) {
            await this.enforcerPromise;
        }
        if (this.enforcer !== undefined) {
            if (domain == undefined) {
                return await this.enforcer.enforce(this.user, object, action);
            } else {
                return await this.enforcer.enforce(this.user, domain, object, action);
            }
        }
        if (this.mode == "manual") {
            return this.permission !== undefined && this.permission.check(action, object);
        } else if (this.mode == "auto") {
            throw Error("Enforcer not initialized");
        } else {
            throw Error(`Mode ${this.mode} not recognized.`);
        }
    }

    public async cannot(action: string, object: string, domain?: string): Promise<boolean> {
        return !(await this.can(action, object, domain));
    }

    public async canAll(action: string, objects: string[], domain?: string) : Promise<boolean> {
        for (let i = 0; i < objects.length; ++i) {
            if (await this.cannot(action, objects[i], domain)) {
                return false;
            }
        }
        return true;
    }

    public async canAny(action: string, objects: string[], domain?: string) : Promise<boolean> {
        for (let i = 0; i < objects.length; ++i) {
            if (await this.can(action, objects[i], domain)) {
                return true;
            }
        }
        return false;
    }

}
