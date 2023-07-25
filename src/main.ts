import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get('app.port');

  const origins = configService.get('cors.origins');
  app.enableCors({ origin: origins });

  await app.listen(PORT);
}
bootstrap();
