import {readFileSync} from 'fs';


function getPolicies(filename: string): string[][] {
    const ret: string[][] = [];
    const s: string = readFileSync(filename).toString();
    const sArray: string[] = s.split("\n");
    for (const item of sArray) {
        ret.push(item.split(','));
    }
    return ret;
}

export const basicPolicies = getPolicies("src/__test__/examples/basic_policy.csv");
export const rabcPolicies = getPolicies("src/__test__/examples/rbac_policy.csv");
export const abacWithObjRulesPolicies = getPolicies("src/__test__/examples/abac_with_obj_rule_policy.csv");
