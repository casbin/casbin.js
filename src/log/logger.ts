export interface Logger {
    // enableLog controls whether print the message.
    enableLog(enable: boolean): void;
  
    // isEnable returns if logger is enabled.
    isEnable(): boolean;
  
    // print formats using the default formats for its operands and logs the message.
    print(...v: any[]): void;
  
    // printf formats according to a format specifier and logs the message.
    printf(format: string, ...v: any[]): void;
  }