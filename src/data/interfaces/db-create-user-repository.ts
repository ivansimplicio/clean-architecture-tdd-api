/* eslint-disable no-redeclare */
import { UserModel } from '@domain/models';

export interface DbCreateUserRepository {
  save(
    data: DbCreateUserRepository.Params
  ): Promise<DbCreateUserRepository.Result>;
}

export namespace DbCreateUserRepository {
  export type Params = Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'>;
  export type Result = UserModel;
}
