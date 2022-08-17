import { InvalidPasswordError } from '@validation/errors';
import { PasswordValidator } from '@validation/validators';

describe('PasswordValidator', () => {
  test('Should validate the password without throwing errors', async () => {
    const passwordValidator = new PasswordValidator();
    const promise = passwordValidator.validate({ password: 'pass@A123' });
    await expect(promise).resolves.not.toThrow();
  });

  test('Should skip validation if password field is not passed', async () => {
    const passwordValidator = new PasswordValidator();
    const promise = passwordValidator.validate({});
    await expect(promise).resolves.not.toThrow();
  });

  test('Should throw an error if an empty string is passed', async () => {
    const passwordValidator = new PasswordValidator();
    const promise = passwordValidator.validate({ password: '' });
    await expect(promise).rejects.toThrow(new InvalidPasswordError());
  });

  test('Should throw an error if an invalid password is passed', async () => {
    const passwordValidator = new PasswordValidator();
    const promise = passwordValidator.validate({ password: 'password' });
    await expect(promise).rejects.toThrow(new InvalidPasswordError());
  });

  test('Should throw an error if the null value is passed', async () => {
    const passwordValidator = new PasswordValidator();
    const promise = passwordValidator.validate({ password: null });
    await expect(promise).rejects.toThrow(new InvalidPasswordError());
  });

  test('Should throw an error if a value with invalid type is passed', async () => {
    const passwordValidator = new PasswordValidator();
    const promise = passwordValidator.validate({ password: 123 });
    await expect(promise).rejects.toThrow(new InvalidPasswordError());
  });
});
