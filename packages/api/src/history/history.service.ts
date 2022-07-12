import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getUnique() {
    // const { skip, take, cursor, where, orderBy = { name: 'asc' } } = params;
    console.log('what');
    return this.prisma.historyV2.findMany({
      distinct: ['plate'],
      select: {
        plate: true,
      },
    });
  }

  async getPlateHistory(plate: string) {
    // const { skip, take, cursor, where, orderBy = { name: 'asc' } } = params;
    return this.prisma.historyV2.findMany({
      where: {
        plate: {
          contains: plate,
        },
      },
    });
  }

  async appendHistoricalRecord(record: any) {
    console.log(record);
    return this.prisma.historyV2.create({
      data: record,
    });
  }
}
