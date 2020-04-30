import { DefaultLogger } from './defaultLogger';
import { Logger } from './logger';

let logger: Logger = new DefaultLogger();

// setLogger sets the current logger.
function setLogger(l: Logger): void {
  logger = l;
}

// getLogger returns the current logger.
function getLogger(): Logger {
  return logger;
}

// logPrint prints the log.
function logPrint(...v: any[]): void {
  logger.print(...v);
}

// logPrintf prints the log with the format.
function logPrintf(format: string, ...v: any[]): void {
  logger.printf(format, ...v);
}

export { setLogger, getLogger, logPrint, logPrintf };