import { InvalidDateError } from '@validation/errors';
import { DateValidator } from '@validation/validators';

import { faker } from '@faker-js/faker';

describe('DateValidator', () => {
  test('Should validate the date without throwing an error', async () => {
    const dateValidator = new DateValidator('date');
    const promise = dateValidator.validate({ date: faker.date.past() });
    await expect(promise).resolves.not.toThrow();
  });

  test('Should skip validation if date field is not passed', async () => {
    const dateValidator = new DateValidator('date');
    const promise = dateValidator.validate({});
    await expect(promise).resolves.not.toThrow();
  });

  test('Should throw an error if an empty string is passed', async () => {
    const dateValidator = new DateValidator('date');
    const promise = dateValidator.validate({ date: '' });
    await expect(promise).rejects.toThrow(new InvalidDateError());
  });

  test('Should throw an error if an invalid date is passed', async () => {
    const dateValidator = new DateValidator('date');
    const promise = dateValidator.validate({ date: '2022-13-31' });
    await expect(promise).rejects.toThrow(new InvalidDateError());
  });

  test('Should throw an error if the null value is passed', async () => {
    const dateValidator = new DateValidator('date');
    const promise = dateValidator.validate({ date: null });
    await expect(promise).rejects.toThrow(new InvalidDateError());
  });

  test('Should throw an error if a value with invalid type is passed', async () => {
    const dateValidator = new DateValidator('date');
    const promise = dateValidator.validate({ date: 123 });
    await expect(promise).rejects.toThrow(new InvalidDateError());
  });
});
