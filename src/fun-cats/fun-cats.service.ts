import { Injectable } from '@nestjs/common';
import { CreateFunCatDto } from './dto/create-fun-cat.dto';
import { UpdateFunCatDto } from './dto/update-fun-cat.dto';

@Injectable()
export class FunCatsService {
  create(createFunCatDto: CreateFunCatDto) {
    return 'This action adds a new funCat';
  }

  findAll() {
    return `This action returns all funCats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} funCat`;
  }

  update(id: number, updateFunCatDto: UpdateFunCatDto) {
    return `This action updates a #${id} funCat`;
  }

  remove(id: number) {
    return `This action removes a #${id} funCat`;
  }
}
