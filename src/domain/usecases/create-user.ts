/* eslint-disable no-redeclare */
import { UserModel } from '@domain/models';

export interface CreateUser {
  create(params: CreateUser.Params): Promise<CreateUser.Result>;
}

export namespace CreateUser {
  export type Params = Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'>;
  export type Result = UserModel;
}
