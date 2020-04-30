import { Effect, Effector } from './effector';

/**
 * DefaultEffector is default effector for Casbin.
 */
export class DefaultEffector implements Effector {
  /**
   * mergeEffects merges all matching results collected by the enforcer into a single decision.
   * @param {string} expr
   * @param {Effect[]} effects
   * @param {number[]} results
   * @returns {boolean}
   */
  public mergeEffects(expr: string, effects: Effect[], results: number[]): boolean {
    let result = false;

    if (expr === 'some(where (p_eft == allow))') {
      result = effects.some(n => n === Effect.Allow);
    } else if (expr === '!some(where (p_eft == deny))') {
      result = !effects.some(n => n === Effect.Deny);
    } else if (expr === 'some(where (p_eft == allow)) && !some(where (p_eft == deny))') {
      result = false;
      for (const eft of effects) {
        if (eft === Effect.Allow) {
          result = true;
        } else if (eft === Effect.Deny) {
          result = false;
          break;
        }
      }
    } else if (expr === 'priority(p_eft) || deny') {
      result = effects.some(n => n !== Effect.Indeterminate && n === Effect.Allow);
    } else {
      throw new Error('unsupported effect');
    }

    return result;
  }
}