import {StringKV} from './utils';

export default class Permission {
    private actObjData : Map<string, Array<string>>;
    private objActData : Map<string, Array<string>>;

    public constructor() {
        this.actObjData = new Map<string, Array<string>>();
        this.objActData = new Map<string, Array<string>>();
    }
    
    /*
        Load the Permission from a JSON string
    */
    public loadFromString(s : string) : void {
        const jsonObj = JSON.parse(s);
        
        // Generate data: {key:Actions, value: Array of objects}
        for (const act in jsonObj) {
            this.actObjData.set(act, jsonObj[act] as Array<string>);
        }

        // Generate data: {key:Objects, value: Array of actions}
        const tmp : StringKV = {};
        for (const act in jsonObj) {
            if (!(jsonObj[act] in tmp)) {
                tmp[jsonObj[act]] = [];
            } 
            tmp[jsonObj[act]].push(act);
        }
        for (const obj in tmp) {
            this.objActData.set(obj, tmp[obj] as Array<string>);
        }

    }

    public getPermissionJson() : {[key: string]: string[]} {
        const obj : {[key: string]: string[]} = {};
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
