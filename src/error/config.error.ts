import { BaseError } from './base.error';

class ConfigError extends BaseError {
  constructor(message: string) {
    super(message, 'ConfigError');
  }
}

export class ConfigFileIsEmptyError extends ConfigError {
  constructor() {
    super('Config file is empty.');
  }
}

export class UnexpectFieldInConfigError extends ConfigError {
  constructor(field: string) {
    super(`Unexpected field "${field}".`);
  }
}
