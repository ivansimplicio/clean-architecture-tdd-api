export class NotEmptyError extends Error {
  constructor(paramName: string) {
    super(`Field ${paramName} cannot be empty`);
    this.name = 'NotEmptyError';
  }
}
