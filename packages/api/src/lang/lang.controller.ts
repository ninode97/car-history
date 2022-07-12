import { Controller, Get, Param } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { GetTranslationDto } from './dto/get-translation.dto';
import { LangService } from './lang.service';

@Controller('lang')
export class LangController {
  constructor(private readonly langService: LangService) {}

  @Get(':langCode')
  getTranslation(@Param() params: GetTranslationDto) {
    return this.langService.getTranslationByLangCode(params.langCode);
  }
}
