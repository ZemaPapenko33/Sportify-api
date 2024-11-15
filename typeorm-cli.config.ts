import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/users/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_host'),
  port: configService.get<number>('DB_port'),
  username: configService.get<string>('DB_username'),
  password: configService.get<string>('DB_password'),
  database: configService.get<string>('DB_database'),
  entities: [User],
  migrations: ['dist/migrations/*.js'],
});
