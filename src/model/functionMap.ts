import * as util from '../util';

// FunctionMap represents the collection of Function.
export class FunctionMap {
  private functions: Map<string, any>;

  /**
   * constructor is the constructor for FunctionMap.
   */
  constructor() {
    this.functions = new Map<string, any>();
  }

  // loadFunctionMap loads an initial function map.
  public static loadFunctionMap(): FunctionMap {
    const fm = new FunctionMap();

    fm.addFunction('keyMatch', util.keyMatchFunc);
    fm.addFunction('keyMatch2', util.keyMatch2Func);
    fm.addFunction('keyMatch3', util.keyMatch3Func);
    fm.addFunction('keyMatch4', util.keyMatch4Func);
    fm.addFunction('regexMatch', util.regexMatchFunc);
    fm.addFunction('ipMatch', util.ipMatchFunc);
    fm.addFunction('globMatch', util.globMatch);

    return fm;
  }

  // addFunction adds an expression function.
  public addFunction(name: string, func: any): void {
    if (!this.functions.get(name)) {
      this.functions.set(name, func);
    }
  }

  // getFunctions return all functions.
  public getFunctions(): any {
    return this.functions;
  }
}
