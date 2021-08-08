// noinspection JSVoidFunctionReturnValueUsed

import { internalRoleManager, MatchingFunc } from './internalRoleManager';
import { RoleManager } from './roleManager';

export class DefaultRoleManager extends internalRoleManager implements RoleManager {
  addDomainMatchingFunc(fn: MatchingFunc): Promise<void> {
    return Promise.resolve(this.addDomainMatchingFuncInternal(fn));
  }

  addMatchingFunc(fn: MatchingFunc): Promise<void> {
    return Promise.resolve(this.addMatchingFuncInternal(fn));
  }

  addLink(name1: string, name2: string, ...domain: string[]): Promise<void> {
    return Promise.resolve(this.addLinkInternal(name1, name2, ...domain));
  }

  deleteLink(name1: string, name2: string, ...domain: string[]): Promise<void> {
    return Promise.resolve(this.deleteLinkInternal(name1, name2, ...domain));
  }

  getRoles(name: string, ...domain: string[]): Promise<string[]> {
    return Promise.resolve(this.getRolesInternal(name, ...domain));
  }

  hasLink(name1: string, name2: string, ...domain: string[]): Promise<boolean> {
    return Promise.resolve(this.hasLinkInternal(name1, name2, ...domain));
  }

  clear(): Promise<void> {
    return Promise.resolve(this.clearInternal());
  }

  getUsers(name: string, ...domain: string[]): Promise<string[]> {
    return Promise.resolve(this.getUsersInternal(name, ...domain));
  }

  printRoles(): Promise<void> {
    return Promise.resolve(this.printRolesInternal());
  }
}
