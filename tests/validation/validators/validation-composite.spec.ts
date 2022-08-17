import { ValidationComposite } from '@validation/validators';
import { Validation } from '@presentation/interfaces';

class MockValidation implements Validation {
  async validate(): Promise<void> {}
}

const makeSut = () => {
  const mockValidation1 = new MockValidation();
  const mockValidation2 = new MockValidation();
  const sut = new ValidationComposite([mockValidation1, mockValidation2]);
  return {
    sut,
    mockValidation1,
    mockValidation2,
  };
};

describe('ValidationComposite', () => {
  test('Should not throw error if no compositing validation throws error', async () => {
    const { sut } = makeSut();
    const promise = sut.validate({});
    await expect(promise).resolves.not.toThrow();
  });

  test('Should throw the error corresponding to validation 1 if it throws an error', async () => {
    const { sut, mockValidation1 } = makeSut();
    jest.spyOn(mockValidation1, 'validate').mockImplementationOnce(async () => {
      throw new Error('validation-1');
    });
    const promise = sut.validate({});
    await expect(promise).rejects.toThrow(new Error('validation-1'));
  });

  test('Should throw the error corresponding to validation 2 if it throws an error', async () => {
    const { sut, mockValidation2 } = makeSut();
    jest.spyOn(mockValidation2, 'validate').mockImplementationOnce(async () => {
      throw new Error('validation-2');
    });
    const promise = sut.validate({});
    await expect(promise).rejects.toThrow(new Error('validation-2'));
  });
});
