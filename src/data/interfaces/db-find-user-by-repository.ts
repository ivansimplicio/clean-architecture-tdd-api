/* eslint-disable no-redeclare */
import { UserModel } from '@domain/models';

export interface DbFindUserByRepository {
  findBy(
    field: string,
    value: any
  ): Promise<DbFindUserByRepository.Result | null>;
}

export namespace DbFindUserByRepository {
  export type Result = UserModel;
}
