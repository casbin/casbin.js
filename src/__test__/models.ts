import { readFileSync } from 'fs';

const basicExample = 'src/__test__/examples/basic_model.conf';
export const basicModelStr = readFileSync(basicExample).toString();

const rbacExample = 'src/__test__/examples/rbac_model.conf';
export const rbacModelStr = readFileSync(rbacExample).toString();

const abacWithObjRuleExample = 'src/__test__/examples/abac_with_obj_rule_policy.csv';
export const abacWithObjRuleModelStr = readFileSync(abacWithObjRuleExample).toString();
