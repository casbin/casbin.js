export default class Profiles {
    private data : Map<string, Array<string> >;

    public constructor() {
        this.data = new Map<string, Array<string>>();
    }
    
    /*
        Load the profiles from a JSON string
    */
    public loadFromString(s : string) : void {
        const jsonObj = JSON.parse(s);
        for (const prop in jsonObj) {
            this.data.set(prop, jsonObj[prop] as Array<string>);
        }
    }

    /*
        Parse the profiles into JSON string
    */
    public getProfilesString() : string {
        const obj : {[key: string]: string[]} = {};
        this.data.forEach((value, key) => (obj[key] = value));
        return JSON.stringify(obj);
    }

    public getTargetsFromAction(action: string) : Array<string> {
        const result = this.data.get(action);
        console.log(result);
        if (result === undefined) {
            return new Array<string>();
        } else {
            return result;
        }
    }
}
