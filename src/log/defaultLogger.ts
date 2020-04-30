import { Logger } from './logger';

// DefaultLogger is the implementation for a Logger
export class DefaultLogger implements Logger {
  private enable = false;

  public enableLog(enable: boolean): void {
    this.enable = enable;
  }

  public isEnable(): boolean {
    return this.enable;
  }

  public print(...v: any[]): void {
    if (this.enable) {
      console.log(...v);
    }
  }

  public printf(format: string, ...v: any[]): void {
    if (this.enable) {
      console.log(format, ...v);
    }
  }
}