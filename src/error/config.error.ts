import { BaseError } from './base.error';

class ConfigError extends BaseError {
  constructor(message: string) {
    /* istanbul ignore next */
    super(message, 'ConfigError');
  }
}

export class ConfigFileIsEmptyError extends ConfigError {
  constructor() {
    /* istanbul ignore next */
    super('Config file is empty.');
  }
}

export class UnexpectFieldInConfigError extends ConfigError {
  constructor(field: string) {
    /* istanbul ignore next */
    super(`Unexpected field "${field}".`);
  }
}
