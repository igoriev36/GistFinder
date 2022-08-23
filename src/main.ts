import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { CustomLoggerService } from './utils/logger/logger.service';
const configService = new ConfigService();
const logger = new CustomLoggerService();


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
  });
  app.enableCors();
  app.useGlobalInterceptors();
  app.useGlobalPipes(new ValidationPipe()); // For Enabling DTOs

  logger.log(
    `App is lising on 127.0.0.0:${configService.port}`);
  await app.listen(configService?.port, '0.0.0.0');
}
bootstrap();
