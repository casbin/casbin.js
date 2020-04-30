import * as rbac from '../rbac/index';
import * as _ from 'lodash';
import { logPrint } from '../log/index';

// Assertion represents an expression in a section of the model.
// For example: r = sub, obj, act
export class Assertion {
  public key: string;
  public value: string;
  public tokens: string[];
  public policy: string[][];
  public rm: rbac.RoleManager;

  /**
   * constructor is the constructor for Assertion.
   */
  constructor() {
    this.key = '';
    this.value = '';
    this.tokens = [];
    this.policy = [];
    this.rm = new rbac.DefaultRoleManager(0);
  }

  public async buildRoleLinks(rm: rbac.RoleManager): Promise<void> {
    this.rm = rm;
    const count = _.words(this.value, /_/g).length;
    for (const rule of this.policy) {
      if (count < 2) {
        throw new Error('the number of "_" in role definition should be at least 2');
      }

      if (rule.length < count) {
        throw new Error('grouping policy elements do not meet role definition');
      }

      if (count === 2) {
        // error intentionally ignored
        await this.rm.addLink(rule[0], rule[1]);
      } else if (count === 3) {
        // error intentionally ignored
        await this.rm.addLink(rule[0], rule[1], rule[2]);
      } else if (count === 4) {
        // error intentionally ignored
        await this.rm.addLink(rule[0], rule[1], rule[2], rule[3]);
      }
    }

    logPrint(`Role links for: ${this.key}`);
    await this.rm.printRoles();
  }
}
