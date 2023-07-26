import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SocketIoAdapter } from './socket-io-adapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get('app.port');
  const SW_TITLE = configService.get('swagger.title');
  const SW_DESC = configService.get('swagger.description');
  const SW_VERSION = configService.get('swagger.version');

  const origins = configService.get('cors.origins');
  app.enableCors({ origin: origins });

  const swaggerOptions = new DocumentBuilder()
    .setTitle(SW_TITLE)
    .setDescription(SW_DESC)
    .setVersion(SW_VERSION)
    .addBearerAuth()
    .build();

  const swagDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/', app, swagDocument);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useWebSocketAdapter(new SocketIoAdapter(app, configService, origins));

  await app.listen(PORT);
}
bootstrap();
