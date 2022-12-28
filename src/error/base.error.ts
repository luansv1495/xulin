import { showError } from '../utils';

export class BaseError extends Error {
  constructor(message: string, name: string) {
    super(message);
    this.name = name;
  }

  showError = (nivel = 0) => showError(this.name, this.message, nivel);
}
