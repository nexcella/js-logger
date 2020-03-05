# Logger

![](https://img.shields.io/npm/types/typescript.svg)

Simple and minimalistic library for logging. 

## Installation

### npm
```
npm i @nexcella/logger
```

### yarn
```
yarn add @nexcella/logger
```


## Usage

```js
// Create logger instance
const logger = new Logger(config: LoggerConfig)

// Logging messages with different types
logger.debug('Simple debug');
logger.info('Simple info');
logger.warn('Simple warn');
logger.error('Error with context', error);

// Get list of stored logs
logger.getLogs();
/*  ->> output - array of log strings
[
    "[1583397656725] DEBUG: Simple debug",
    "[2146437.1550000506] INFO: Simple info",
    "[2146437.159999972] WARN: Simple warn",
    "[2146437.159999972] ERROR: Error with context, {message: "Error message"}",
]*/
```
## Methods:
### This library supports the following logging methods:
- debug
- info
- warn
- error

All this methods have the following signature
```js
logger.debug(message: string, ...context: any);
```
An unlimited number of contexts can be passed to a method.
```js
logger.debug('message', {text: 'context1'}, {text: 'context2'}, {text: 'context3'});
```
**IMPORTANT** 

All contexts serialized by `JSON.stringify`.

### Getting stored logs
```js
logger.getLogs();
```

Return a list of stored logs in the format:

`[time] LOG_LEVEL message [context]`

[time] calculating by next rules:
 - first message stored current timestamp
 - all next messages stored result of `performance.now()`


## Config:

```typescript
enum LOG_LEVEL {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  NONE = 'NONE'
}
```

| Key | Type | Required | Description |
|--|--|--|--|
| logLevel | LOG_LEVEL | yes | Minimal log level for showing in console. All logs are stored in the storage regardless of this setting |

## Licence

License is MIT
