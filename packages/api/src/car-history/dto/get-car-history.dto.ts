import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class GetCarHistoryParamsDto {
  @Type(() => Number)
  @Min(0)
  @IsInt()
  carId: number;
}
