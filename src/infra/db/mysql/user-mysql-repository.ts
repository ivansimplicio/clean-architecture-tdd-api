import { Repository } from 'typeorm';
import source from '@infra/db/mysql/config/data-source';
import { User } from '@infra/db/mysql/entities';
import {
  DbCreateUserRepository,
  DbFindUserByRepository,
} from '@data/interfaces';

export class UserMySqlRepository
  implements DbCreateUserRepository, DbFindUserByRepository
{
  private repository: Repository<User> = source.getRepository<User>(User);

  async save(
    data: DbCreateUserRepository.Params
  ): Promise<DbCreateUserRepository.Result> {
    return this.repository.save(data);
  }

  async findBy(
    field: string,
    value: any
  ): Promise<DbFindUserByRepository.Result | null> {
    const query = Object.fromEntries([[field, value]]);
    return this.repository.findOne({ where: query });
  }
}
