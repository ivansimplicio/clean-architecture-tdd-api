import 'dotenv/config';

const ormConfig = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: false,
  migrationsTableName: 'migrations',
  entities: ['./src/infra/db/mysql/entities/*.ts'],
  migrations: ['./database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: './database/migrations',
  },
};

export default ormConfig;
