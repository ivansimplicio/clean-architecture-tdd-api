import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1660821579068 implements MigrationInterface {
  tableName = 'users';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar(50)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'cpf',
            type: 'varchar(15)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar(200)',
            isNullable: false,
          },
          {
            name: 'birth_date',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
