import { Logger } from '../utils';

export class BaseError extends Error {
  constructor(message: string, name: string) {
    super(message);
    this.name = name;
  }

  showError = (nivel?: number): void =>
    Logger.error(this.name, this.message, nivel ?? 0);
}
