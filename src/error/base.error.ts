import { Logger } from '../utils';

export class BaseError extends Error {
  constructor(message: string, name: string) {
    /* istanbul ignore next */
    super(message);
    this.name = name;
  }

  showError = (nivel = 0) => Logger.error(this.name, this.message, nivel);
}
