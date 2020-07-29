import {StringKV} from './types';

export default class Permission {
    private actObjData : Map<string, Array<string>>;
    private objActData : Map<string, Array<string>>;

    public constructor() {
        this.actObjData = new Map<string, Array<string>>();
        this.objActData = new Map<string, Array<string>>();
    }
    

    public load(permission : string | Record<string, unknown>) : void {
        let p : StringKV;
        if (typeof(permission) == 'string') {
            p = JSON.parse(permission) as StringKV;
        } else {
            p = permission as StringKV;
        }

        // Generate data: {key:Actions, value: Array of objects}
        for (const act in p) {
            this.actObjData.set(act, p[act] as Array<string>);
        }

        // Generate data: {key:Objects, value: Array of actions}
        const tmp : StringKV = {};
        for (const act in p) {
            for (const obj in p[act]) {
                if (!(obj in tmp)) {
                    tmp[obj] = [];
                }
                tmp[obj].push(act);
            }
        }
        for (const obj in tmp) {
            this.objActData.set(obj, tmp[obj] as Array<string>);
        }
        
    }

    public getPermissionJson() : StringKV {
        const obj : StringKV = {};
        this.actObjData.forEach((value, key) => (obj[key] = value));
        return obj;
    }

    /*
        Parse the permission into JSON string
    */
    public getPermissionString() : string {
        return JSON.stringify(this.getPermissionJson());
    }

    public getTargetsFromAction(action: string) : Array<string> {
        const result = this.actObjData.get(action);
        if (result === undefined) {
            return new Array<string>();
        } else {
            return result;
        }
    }

    public getActionsObjects() : Map<string, Array<string>> {
        return this.actObjData;
    }

    public getObjectsActions() : Map<string, Array<string>> {
        return this.objActData;
    }

    public check(action : string, object : string) : boolean {
        const objects = this.actObjData.get(action);
        if (objects == undefined) {
            return false;
        } else {
            return objects.includes(object);
        }
    }
}
