import { NotEmptyValidator } from '@validation/validators';
import { NotEmptyError } from '@validation/errors';

describe('NotEmptyValidator', () => {
  test('Should validate the field without throwing an error', async () => {
    const notEmptyValidator = new NotEmptyValidator('name');
    const promise = notEmptyValidator.validate({ name: 'not-empty' });
    await expect(promise).resolves.not.toThrow();
  });

  test('Should throw an error if the field is not passed', async () => {
    const notEmptyValidator = new NotEmptyValidator('name');
    const promise = notEmptyValidator.validate({});
    await expect(promise).rejects.toThrow(new NotEmptyError('name'));
  });

  test('Should throw an error if an empty string is passed', async () => {
    const notEmptyValidator = new NotEmptyValidator('name');
    const promise = notEmptyValidator.validate({ name: '' });
    await expect(promise).rejects.toThrow(new NotEmptyError('name'));
  });

  test('Should throw an error if a string with only empty spaces is passed', async () => {
    const notEmptyValidator = new NotEmptyValidator('name');
    const promise = notEmptyValidator.validate({ name: ' ' });
    await expect(promise).rejects.toThrow(new NotEmptyError('name'));
  });

  test('Should throw an error if the null value is passed', async () => {
    const notEmptyValidator = new NotEmptyValidator('name');
    const promise = notEmptyValidator.validate({ name: null });
    await expect(promise).rejects.toThrow(new NotEmptyError('name'));
  });
});
