import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupportedLangsEnum } from './dto/get-translation.dto';
import { readdirSync, readFileSync } from 'fs';
import * as path from 'path';
@Injectable()
export class LangService {
  private availableLanguages = {};
  constructor() {
    this.autoload();
  }

  getTranslationByLangCode(langCode: string) {
    return this.availableLanguages[langCode];
  }

  autoload() {
    try {
      const i18nAssets = path.join(__dirname, 'i18n');
      const langDirs = readdirSync(i18nAssets);
      for (const langDir of langDirs) {
        const translationJSON = this.getLocalePath(i18nAssets, langDir);
        const translation = readFileSync(translationJSON, {
          encoding: 'utf8',
        });
        Object.assign(this.availableLanguages, {
          [langDir]: JSON.parse(translation),
        });
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  getLocalePath(i18nPath, langCode) {
    return path.join(i18nPath, langCode, 'translation.json');
  }
}
