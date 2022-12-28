import { BaseError } from './base.error';

class InitError extends BaseError {
  constructor(message: string) {
    super(message, 'InitError');
  }
}

export class ProjectPathNotFoundError extends InitError {
  constructor(projectPath: string) {
    super(`Project path "${projectPath ?? ''}" not found.`);
  }
}
