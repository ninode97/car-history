import { Type } from 'class-transformer';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateCarModelDto {
  @IsInt()
  brandId: number;

  @IsString()
  name: string;
}
