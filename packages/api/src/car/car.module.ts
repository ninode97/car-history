import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CarController } from './car.controller';
import { CarService } from './car.service';


@Module({
  controllers: [CarController],
  providers: [CarService, PrismaService],
})
export class CarModule {}
