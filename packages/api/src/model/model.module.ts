import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma.service';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';

@Module({
  controllers: [ModelController],
  providers: [ModelService, PrismaService, CaslAbilityFactory],
})
export class ModelModule {}
