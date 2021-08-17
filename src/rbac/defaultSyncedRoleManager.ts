import { internalRoleManager, MatchingFunc } from './internalRoleManager';
import { RoleManager } from './roleManager';

export class DefaultSyncedRoleManager extends internalRoleManager implements RoleManager {
  public static synced(): boolean {
    return true;
  }

  public addDomainMatchingFunc(fn: MatchingFunc): void {
    return this.addDomainMatchingFuncInternal(fn);
  }

  public addMatchingFunc(fn: MatchingFunc): void {
    return this.addMatchingFuncInternal(fn);
  }

  public addLink(name1: string, name2: string, ...domain: string[]): void {
    return this.addLinkInternal(name1, name2, ...domain);
  }

  public clear(): void {
    return this.clearInternal();
  }

  public deleteLink(name1: string, name2: string, ...domain: string[]): void {
    return this.deleteLinkInternal(name1, name2, ...domain);
  }

  public getRoles(name: string, ...domain: string[]): string[] {
    return this.getRolesInternal(name, ...domain);
  }

  public getUsers(name: string, ...domain: string[]): string[] {
    return this.getUsersInternal(name, ...domain);
  }

  public hasLink(name1: string, name2: string, ...domain: string[]): boolean {
    return this.hasLinkInternal(name1, name2, ...domain);
  }

  public printRoles(): void {
    return this.printRolesInternal();
  }
}
