import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class PostCarRequestDto {
  @IsString()
  plateCode: string;

  @IsString()
  vinCode: string;

  @Type(() => Number)
  @IsInt()
  @IsNumber()
  @IsPositive()
  companyId: number;

  @Type(() => Number)
  @IsInt()
  @IsNumber()
  @IsPositive()
  modelId: number;

  @Type(() => Number)
  @IsInt()
  @IsNumber()
  @IsPositive()
  year: number;

  @IsDateString()
  acquiredDate: string;

  @IsDateString()
  insuranceValidFrom: string;

  @IsDateString()
  insuranceExpiresOn: string;

  @IsDateString()
  technicalInspectionValidFrom: string;

  @IsDateString()
  technicalInspectionExpiresOn: string;

  get _acquiredDate() {
    return new Date(this.acquiredDate);
  }
  get _insuranceValidFrom() {
    return new Date(this.insuranceValidFrom);
  }
  get _insuranceExpiresOn() {
    return new Date(this.insuranceExpiresOn);
  }
  get _technicalInspectionValidFrom() {
    return new Date(this.technicalInspectionValidFrom);
  }
  get _technicalInspectionExpiresOn() {
    return new Date(this.technicalInspectionExpiresOn);
  }
}
