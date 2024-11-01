import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Автоматически преобразует объекты к нужному типу
      whitelist: true, // Удаляет свойства, которые отсутствуют в DTO
      forbidNonWhitelisted: true, // Генерирует ошибку, если обнаружены невалидные поля
      exceptionFactory: (errors) => {
        const messages = errors.map(
          (error) =>
            `${error.property} - ${Object.values(error.constraints).join(', ')}`,
        );
        return new InternalServerErrorException(messages);
      },
    }),
  );
  await app.listen(app.get(ConfigService).get('port'));
}
bootstrap();
