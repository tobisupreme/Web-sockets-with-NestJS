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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/auth.decorators';

@ApiTags('Fun Cats')
@Controller('fun-cats')
export class FunCatsController {
  constructor(private readonly funCatsService: FunCatsService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createFunCatDto: CreateFunCatDto) {
    return this.funCatsService.create(createFunCatDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.funCatsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funCatsService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFunCatDto: UpdateFunCatDto) {
    return this.funCatsService.update(+id, updateFunCatDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funCatsService.remove(+id);
  }
}
