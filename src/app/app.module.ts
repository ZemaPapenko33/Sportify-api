import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configurations from '../configurations/index';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    DatabaseModule,
  ], //Используется для: импорта других модулей
  controllers: [AppController], //
  providers: [AppService], // Используется для: обработки бизнес логики
  // exports: [] // Используется для: экспорта своей логики
})
export class AppModule {}
