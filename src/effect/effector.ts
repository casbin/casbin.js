export enum Effect {
    Allow = 1,
    Indeterminate,
    Deny
  }
  
  // Effector is the interface for Casbin effectors.
  export interface Effector {
    // mergeEffects merges all matching results collected by the enforcer into a single decision.
    mergeEffects(expr: string, effects: Effect[], results: number[]): boolean;
  }