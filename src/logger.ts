export type LoggerConfig = {
  logLevel: LOG_LEVEL,
}

export enum LOG_LEVEL {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  NONE = 'NONE'
}

type LogMessage = {
  date: number,
  level: LOG_LEVEL,
  message: string,
  context?: any[]
}

export class Logger {
  constructor(private config: LoggerConfig) {
  }

  private logData: LogMessage[] = [];

  public getLogs() {
    return this.logData.map((log, index) => this.formatMessage(log, true, index));
  }

  public debug = (message: string, ...context: any[]) => {
    this.storeMessage(LOG_LEVEL.DEBUG, message, context);
  };

  public info = (message: string, ...context: any[]) => {
    this.storeMessage(LOG_LEVEL.INFO, message, context);
  };
  public warn = (message: string, ...context: any[]) => {
    this.storeMessage(LOG_LEVEL.WARN, message, context);
  };
  public error = (message: string, ...context: any[]) => {
    this.storeMessage(LOG_LEVEL.ERROR, message, context);
  };

  private storeMessage = (level: LOG_LEVEL, message: string, context: any[]) => {
    const logMessage: LogMessage = {
      date: new Date().getTime(),
      level,
      message,
      context
    };
    this.logData.push(logMessage);
    this.printMessage(logMessage);
  };

  private formatMessage = ({date, level, message, context}: LogMessage, needAdditionalInfo = true, index?: number,) => {
    let loggedDate = date;
    if (index && index > 0) {
      loggedDate = window.performance.now();
    }
    let formatMessage = `${message}`;
    if (needAdditionalInfo) {
      formatMessage = `[${loggedDate}] ${[level]}: ${formatMessage}`;
    }
    if (context && context.length > 0) {
      let serializedContext = '';
      try {
        serializedContext = JSON.stringify(context);
      } catch (e) {
        serializedContext = `wrong context - ${e.message}`;
      }
      formatMessage += ` / ${JSON.stringify(serializedContext)}`;
    }
    return formatMessage;
  };

  private printMessage(logMessage: LogMessage) {
    const logLevelMap = Object.keys(LOG_LEVEL);
    if (logLevelMap.indexOf(logMessage.level) < logLevelMap.indexOf(this.config.logLevel)) {
      return;
    }
    const formattedMessage = this.formatMessage(logMessage, false);
    switch (logMessage.level) {
      case LOG_LEVEL.DEBUG:
        console.debug(formattedMessage);
        break;
      case LOG_LEVEL.INFO:
        console.info(formattedMessage);
        break;
      case LOG_LEVEL.WARN:
        console.warn(formattedMessage);
        break;
      case LOG_LEVEL.ERROR:
        console.error(formattedMessage);
        break;
    }
  }
}
