import { Prisma, Car as CarModel } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsPositive, Max, Min } from 'class-validator';

export class GetCarsResponseDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsPositive()
  skip = 0;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(100)
  take = 10;

  @IsArray()
  data: CarModel[] = [];
}
