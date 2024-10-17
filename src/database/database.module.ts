import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres'>('DB_type'),
        host: configService.get<string>('DB_host'),
        port: configService.get<number>('DB_port'),
        username: configService.get<string>('DB_username'),
        password: configService.get<string>('DB_password'),
        database: configService.get<string>('DB_database'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
