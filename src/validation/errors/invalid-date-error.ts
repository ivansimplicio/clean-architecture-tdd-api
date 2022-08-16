export class InvalidDateError extends Error {
  constructor() {
    super('Invalid pattern date. Use yyyy-mm-dd');
    this.name = 'InvalidDateError';
  }
}
