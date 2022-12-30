import { BaseError } from './base.error';

class InitError extends BaseError {
  constructor(message: string) {
    /* istanbul ignore next */
    super(message, 'InitError');
  }
}

export class ProjectPathNotFoundError extends InitError {
  constructor(projectPath: string) {
    /* istanbul ignore next */
    super(`Project path "${projectPath ?? ''}" not found.`);
  }
}
