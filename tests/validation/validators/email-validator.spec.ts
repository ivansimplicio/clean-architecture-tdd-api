import { InvalidEmailError } from '@validation/errors';
import { EmailValidator } from '@validation/validators';

import { faker } from '@faker-js/faker';

describe('EmailValidator', () => {
  test('Should validate the email without throwing an error', async () => {
    const emailValidator = new EmailValidator();
    const promise = emailValidator.validate({ email: faker.internet.email() });
    await expect(promise).resolves.not.toThrow();
  });

  test('Should skip validation if email field is not passed', async () => {
    const emailValidator = new EmailValidator();
    const promise = emailValidator.validate({});
    await expect(promise).resolves.not.toThrow();
  });

  test('Should throw an error if an empty string is passed', async () => {
    const emailValidator = new EmailValidator();
    const promise = emailValidator.validate({ email: '' });
    await expect(promise).rejects.toThrow(new InvalidEmailError());
  });

  test('Should throw an error if an invalid email is passed', async () => {
    const emailValidator = new EmailValidator();
    const promise = emailValidator.validate({ email: 'invalid-email@' });
    await expect(promise).rejects.toThrow(new InvalidEmailError());
  });

  test('Should throw an error if the null value is passed', async () => {
    const emailValidator = new EmailValidator();
    const promise = emailValidator.validate({ email: null });
    await expect(promise).rejects.toThrow(new InvalidEmailError());
  });

  test('Should throw an error if a value with invalid type is passed', async () => {
    const emailValidator = new EmailValidator();
    const promise = emailValidator.validate({ email: 123 });
    await expect(promise).rejects.toThrow(new InvalidEmailError());
  });
});
