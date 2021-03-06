import { newEnforcer as oldNewEnforcer, newModel, StringAdapter } from 'casbin';
import { Enforcer as oldEnforcer } from 'casbin';
import sp from 'synchronized-promise';
export class Enforcer {
    enforcer?: oldEnforcer;
    sub?: string;
    constructor() {}
    /**
     *
     * @param rvals
     * input parameters are usually: (sub, obj, act).
     * or (obj, act).
     */
    enforce(...rvals: any[]): boolean {
        if (rvals.length === 2) {
            rvals.unshift(this.sub!);
        }
        return this.enforcer!.enforceSync(...rvals);
    }
}

export const newEnforcer = (model: string, policy: string) => {
    const enforcer = new Enforcer();

    let asyncFunc = () => {
        return oldNewEnforcer(newModel(model), new StringAdapter(policy));
    };
    enforcer.enforcer = sp(asyncFunc)();
    return enforcer;
};
