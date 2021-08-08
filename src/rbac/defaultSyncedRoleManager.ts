import { internalRoleManager, MatchingFunc } from './internalRoleManager';
import { SyncedRoleManager } from './roleManager';

export class DefaultSyncedRoleManager extends internalRoleManager implements SyncedRoleManager {
  addDomainMatchingFunc(fn: MatchingFunc): void {
    return this.addDomainMatchingFuncInternal(fn);
  }

  addMatchingFunc(fn: MatchingFunc): void {
    return this.addMatchingFuncInternal(fn);
  }

  addLink(name1: string, name2: string, ...domain: string[]): void {
    return this.addLinkInternal(name1, name2, ...domain);
  }

  clear(): void {
    return this.clearInternal();
  }

  deleteLink(name1: string, name2: string, ...domain: string[]): void {
    return this.deleteLinkInternal(name1, name2, ...domain);
  }

  getRoles(name: string, ...domain: string[]): string[] {
    return this.getRolesInternal(name, ...domain);
  }

  getUsers(name: string, ...domain: string[]): string[] {
    return this.getUsersInternal(name, ...domain);
  }

  hasLink(name1: string, name2: string, ...domain: string[]): boolean {
    return this.hasLinkInternal(name1, name2, ...domain);
  }

  printRoles(): void {
    return this.printRolesInternal();
  }
}
