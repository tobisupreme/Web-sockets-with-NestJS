import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { ConfigModule } from '@nestjs/config';
import { FunCatsModule } from './fun-cats/fun-cats.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import appConfig from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    FunCatsModule,
    UsersModule,
    AuthModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
