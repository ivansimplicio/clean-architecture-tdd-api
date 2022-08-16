import { CreateUser } from '@domain/usecases';
import {
  DbCreateUserRepository,
  DbFindUserByRepository,
} from '@data/interfaces';

export class DbCreateUser implements CreateUser {
  constructor(
    private dbCreateUserRepository: DbCreateUserRepository,
    private dbFindUserByRepository: DbFindUserByRepository
  ) {}

  async create(params: CreateUser.Params): Promise<CreateUser.Result> {
    if (await this.dbFindUserByRepository.findBy('email', params.email)) {
      throw new Error('Email is already registered');
    }
    if (await this.dbFindUserByRepository.findBy('cpf', params.cpf)) {
      throw new Error('CPF is already registered');
    }
    return this.dbCreateUserRepository.save(params);
  }
}
