// noinspection JSVoidFunctionReturnValueUsed

import { internalRoleManager, MatchingFunc } from './internalRoleManager';
import { RoleManager } from './roleManager';

export class DefaultRoleManager extends internalRoleManager implements RoleManager {
  public static synced(): boolean {
    return false;
  }

  public addDomainMatchingFunc(fn: MatchingFunc): Promise<void> {
    return Promise.resolve(this.addDomainMatchingFuncInternal(fn));
  }

  public addMatchingFunc(fn: MatchingFunc): Promise<void> {
    return Promise.resolve(this.addMatchingFuncInternal(fn));
  }

  public addLink(name1: string, name2: string, ...domain: string[]): Promise<void> {
    return Promise.resolve(this.addLinkInternal(name1, name2, ...domain));
  }

  public deleteLink(name1: string, name2: string, ...domain: string[]): Promise<void> {
    return Promise.resolve(this.deleteLinkInternal(name1, name2, ...domain));
  }

  public getRoles(name: string, ...domain: string[]): Promise<string[]> {
    return Promise.resolve(this.getRolesInternal(name, ...domain));
  }

  public hasLink(name1: string, name2: string, ...domain: string[]): Promise<boolean> {
    return Promise.resolve(this.hasLinkInternal(name1, name2, ...domain));
  }

  public clear(): Promise<void> {
    return Promise.resolve(this.clearInternal());
  }

  public getUsers(name: string, ...domain: string[]): Promise<string[]> {
    return Promise.resolve(this.getUsersInternal(name, ...domain));
  }

  public printRoles(): Promise<void> {
    return Promise.resolve(this.printRolesInternal());
  }
}
