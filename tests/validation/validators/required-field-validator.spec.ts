import { MissingParamError } from '@validation/errors';
import { RequiredFieldValidator } from '@validation/validators';

describe('RequiredFieldValidator', () => {
  test('Should validate if the field was passed without throwing errors (case 1)', async () => {
    const requiredFieldValidator = new RequiredFieldValidator('name');
    const promise = requiredFieldValidator.validate({ name: 'required-field' });
    await expect(promise).resolves.not.toThrow();
  });

  test('Should validate if the field was passed without throwing errors (case 2)', async () => {
    const requiredFieldValidator = new RequiredFieldValidator('name');
    const promise = requiredFieldValidator.validate({ name: '' });
    await expect(promise).resolves.not.toThrow();
  });

  test('Should validate if the field was passed without throwing errors (case 3)', async () => {
    const requiredFieldValidator = new RequiredFieldValidator('name');
    const promise = requiredFieldValidator.validate({ name: null });
    await expect(promise).resolves.not.toThrow();
  });

  test('Should throw an error if the field is not passed', async () => {
    const requiredFieldValidator = new RequiredFieldValidator('name');
    const promise = requiredFieldValidator.validate({});
    await expect(promise).rejects.toThrow(new MissingParamError('name'));
  });
});
