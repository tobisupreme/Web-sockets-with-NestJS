import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { ConfigModule } from '@nestjs/config';
import { FunCatsModule } from './fun-cats/fun-cats.module';
import appConfig from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    FunCatsModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
