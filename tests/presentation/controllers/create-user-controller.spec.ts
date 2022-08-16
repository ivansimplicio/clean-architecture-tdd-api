import { CreateUser } from '@domain/usecases';
import { CreateUserController } from '@presentation/controllers';
import {
  Validation,
  HttpRequest,
  HttpResponse,
} from '@presentation/interfaces';
import { unprocessableEntity, created } from '@presentation/helpers';

import { faker } from '@faker-js/faker';
import { cpf } from 'cpf-cnpj-validator';

class MockCreateUser implements CreateUser {
  async create(): Promise<CreateUser.Result> {
    return fakeResponse.body;
  }
}

class MockValidation implements Validation {
  async validate(): Promise<void> {}
}

const fakeUser = {
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: cpf.generate(),
  birthDate: faker.date.birthdate(),
};

const fakeRequest: HttpRequest = {
  body: fakeUser,
};

const fakeResponse: HttpResponse = {
  statusCode: 201,
  body: {
    id: 1,
    ...fakeUser,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  },
};

const makeSut = () => {
  const mockCreateUser = new MockCreateUser();
  const mockValidation = new MockValidation();
  const sut = new CreateUserController(mockCreateUser, mockValidation);
  return {
    sut,
    mockCreateUser,
    mockValidation,
  };
};

describe('CreateUserController', () => {
  test('Should create the user and return status code 201', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(fakeRequest);
    expect(response).toEqual(created(fakeResponse.body));
  });

  test('Should call the validate method with the correct values', async () => {
    const { mockValidation, sut } = makeSut();
    const validateSpy = jest.spyOn(mockValidation, 'validate');
    await sut.handle(fakeRequest);
    expect(validateSpy).toHaveBeenCalledWith(fakeRequest.body);
  });

  test('Should return status code 422 when validation fails', async () => {
    const { mockValidation, sut } = makeSut();
    jest.spyOn(mockValidation, 'validate').mockImplementationOnce(async () => {
      throw new Error('validation-error');
    });
    const response = await sut.handle(fakeRequest);
    expect(response).toEqual(unprocessableEntity('validation-error'));
  });

  test('Should call the create method with the correct values', async () => {
    const { mockCreateUser, sut } = makeSut();
    const createSpy = jest.spyOn(mockCreateUser, 'create');
    await sut.handle(fakeRequest);
    expect(createSpy).toHaveBeenCalledWith(fakeRequest.body);
  });

  test('Should return status code 422 when creation fails', async () => {
    const { mockCreateUser, sut } = makeSut();
    jest.spyOn(mockCreateUser, 'create').mockImplementationOnce(() => {
      throw new Error('creation-error');
    });
    const response = await sut.handle(fakeRequest);
    expect(response).toEqual(unprocessableEntity('creation-error'));
  });
});
