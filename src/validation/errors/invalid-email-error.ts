export class InvalidEmailError extends Error {
  constructor() {
    super('Invalid Email');
    this.name = 'InvalidEmailError';
  }
}
