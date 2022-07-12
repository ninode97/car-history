import { Module } from '@nestjs/common';
import { LangService } from './lang.service';
import { LangController } from './lang.controller';

@Module({
  providers: [LangService],
  controllers: [LangController]
})
export class LangModule {}
