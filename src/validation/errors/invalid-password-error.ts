export class InvalidPasswordError extends Error {
  constructor() {
    super('The password provided is not strong enough');
    this.name = 'InvalidPasswordError';
  }
}
