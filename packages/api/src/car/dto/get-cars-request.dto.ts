import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class GetCarsRequestDto {
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @IsInt()
  skip = 0;

  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Max(100)
  take = 10;

  @IsOptional()
  cursor?: Prisma.CarWhereUniqueInput;

  @IsOptional()
  where?: Prisma.CarWhereInput;
}
