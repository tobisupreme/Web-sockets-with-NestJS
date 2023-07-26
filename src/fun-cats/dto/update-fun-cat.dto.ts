import { PartialType } from '@nestjs/mapped-types';
import { CreateFunCatDto } from './create-fun-cat.dto';

export class UpdateFunCatDto extends PartialType(CreateFunCatDto) {}
