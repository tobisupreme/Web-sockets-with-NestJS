import { Module } from '@nestjs/common';
import { FunCatsService } from './fun-cats.service';
import { FunCatsController } from './fun-cats.controller';

@Module({
  controllers: [FunCatsController],
  providers: [FunCatsService]
})
export class FunCatsModule {}
