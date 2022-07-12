import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CarHistoryController } from './car-history.controller';
import { CarHistoryService } from './car-history.service';

@Module({
  controllers: [CarHistoryController],
  providers: [CarHistoryService, PrismaService],
})
export class CarHistoryModule {}
