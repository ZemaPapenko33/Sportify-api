import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_host,
  port: Number(process.env.DB_port),
  username: process.env.DB_username,
  password: process.env.DB_password,
  database: process.env.DB_database,
  entities: ['src/**/*.entity.ts'],
  migrations: ['./migrations/*.ts'],
  migrationsRun: true,
});
