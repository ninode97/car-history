import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('/unique-plates')
  async getUniquePlates() {
    const records = await this.historyService.getUnique();
    return {
      data: records.map((r) => r.plate),
    };
  }

  @Get(':plate')
  async getEntries(@Param() params: any) {
    const records = await this.historyService.getPlateHistory(params.plate);
    return {
      data: records,
    };
  }

  @Post(':plate')
  async addEntry(@Param() params: any, @Body() body: any) {
    const data = (body && body.body) || {};
    const record = {
      ...data,
      plate: params.plate || '',
    };
    const entry = await this.historyService.appendHistoricalRecord(record);
    return {
      data: entry,
    };
  }
}
