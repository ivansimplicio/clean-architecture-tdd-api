import {
  DbCreateUserRepository,
  DbFindUserByRepository,
} from '@data/interfaces';
import { DbCreateUser } from '@data/usecases';

import { faker } from '@faker-js/faker';
import { cpf } from 'cpf-cnpj-validator';

const fakeUser = {
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: cpf.generate(),
  birthDate: faker.date.birthdate(),
};

const fakeCreateUserParams = fakeUser;

const fakeCreateUserResult = {
  id: 1,
  ...fakeUser,
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
};

class MockUserRepository
  implements DbCreateUserRepository, DbFindUserByRepository
{
  async save(): Promise<DbCreateUserRepository.Result> {
    return fakeCreateUserResult;
  }

  async findBy(): Promise<DbFindUserByRepository.Result | null> {
    return null;
  }
}

const makeSut = () => {
  const userRepository = new MockUserRepository();
  const sut = new DbCreateUser(userRepository, userRepository);
  return {
    sut,
    userRepository,
  };
};

describe('DbCreateUser', () => {
  test('Should save and return the user created in the database if all values are correct', async () => {
    const { sut } = makeSut();
    const result = await sut.create(fakeCreateUserParams);
    expect(result).toBe(fakeCreateUserResult);
  });

  test('Should call the save method with the correct values', async () => {
    const { sut, userRepository } = makeSut();
    const saveSpy = jest.spyOn(userRepository, 'save');
    await sut.create(fakeCreateUserParams);
    expect(saveSpy).toHaveBeenCalledWith(fakeCreateUserParams);
  });

  test('Should throw an error if the save method throws any error', async () => {
    const { sut, userRepository } = makeSut();
    jest.spyOn(userRepository, 'save').mockImplementationOnce(async () => {
      throw new Error();
    });
    const promise = sut.create(fakeCreateUserParams);
    expect(promise).rejects.toThrow(new Error());
  });

  test('Should call the findBy method with the correct values', async () => {
    const { sut, userRepository } = makeSut();
    const findBySpy = jest.spyOn(userRepository, 'findBy');
    await sut.create(fakeCreateUserParams);
    expect(findBySpy).toHaveBeenCalledWith('email', fakeCreateUserParams.email);
    expect(findBySpy).toHaveBeenCalledWith('cpf', fakeCreateUserParams.cpf);
  });

  test('Should throw an error if the findBy method throws any error', async () => {
    const { sut, userRepository } = makeSut();
    jest.spyOn(userRepository, 'findBy').mockImplementationOnce(async () => {
      return fakeCreateUserResult;
    });
    const promise = sut.create(fakeCreateUserParams);
    expect(promise).rejects.toThrow();
  });
});
