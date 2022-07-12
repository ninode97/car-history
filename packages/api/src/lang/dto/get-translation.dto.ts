import { IsEnum, IsString } from 'class-validator';

export enum SupportedLangsEnum {
  EN = 'en',
  LT = 'lt',
}

export class GetTranslationDto {
  @IsString()
  @IsEnum(SupportedLangsEnum)
  langCode: string;
}
