import { CpfValidator } from '@validation/validators';
import { InvalidCpfError } from '@validation/errors';

import { cpf } from 'cpf-cnpj-validator';

describe('CpfValidator', () => {
  test('Should validate the CPF without throwing an error', async () => {
    const cpfValidator = new CpfValidator();
    const promise = cpfValidator.validate({ cpf: cpf.generate() });
    await expect(promise).resolves.not.toThrow();
  });

  test('Should skip validation if CPF field is not passed', async () => {
    const cpfValidator = new CpfValidator();
    const promise = cpfValidator.validate({});
    await expect(promise).resolves.not.toThrow();
  });

  test('Should throw an error if an empty string is passed', async () => {
    const cpfValidator = new CpfValidator();
    const promise = cpfValidator.validate({ cpf: '' });
    await expect(promise).rejects.toThrow(new InvalidCpfError());
  });

  test('Should throw an error if an invalid CPF is passed', async () => {
    const cpfValidator = new CpfValidator();
    const promise = cpfValidator.validate({ cpf: '00000000000' });
    await expect(promise).rejects.toThrow(new InvalidCpfError());
  });

  test('Should throw an error if the null value is passed', async () => {
    const cpfValidator = new CpfValidator();
    const promise = cpfValidator.validate({ cpf: null });
    await expect(promise).rejects.toThrow(new InvalidCpfError());
  });

  test('Should throw an error if a value with invalid type is passed', async () => {
    const cpfValidator = new CpfValidator();
    const promise = cpfValidator.validate({ cpf: 123 });
    await expect(promise).rejects.toThrow(new InvalidCpfError());
  });
});
