import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FunCatsService } from './fun-cats.service';
import { CreateFunCatDto } from './dto/create-fun-cat.dto';
import { UpdateFunCatDto } from './dto/update-fun-cat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Fun Cats')
@Controller('fun-cats')
export class FunCatsController {
  constructor(private readonly funCatsService: FunCatsService) {}

  @Post()
  create(@Body() createFunCatDto: CreateFunCatDto) {
    return this.funCatsService.create(createFunCatDto);
  }

  @Get()
  findAll() {
    return this.funCatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funCatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFunCatDto: UpdateFunCatDto) {
    return this.funCatsService.update(+id, updateFunCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funCatsService.remove(+id);
  }
}
