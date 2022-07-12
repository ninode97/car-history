import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PostCarHistoryParamsDto {
  @Type(() => Number)
  @Min(0)
  @IsInt()
  carId: number;
}

export class PostCarHistoryBodyDto {
  @IsOptional()
  @IsString()
  code: string;

  @Type(() => Number)
  @Min(0)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  price: number;

  @IsString()
  billCode: string;

  @IsString()
  serviceCompany: string;

  @IsString()
  serviceName: string;

  @IsString()
  productName: string;
}
