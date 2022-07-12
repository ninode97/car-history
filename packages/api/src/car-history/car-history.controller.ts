import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CarHistoryService } from './car-history.service';
import { GetCarHistoryParamsDto } from './dto/get-car-history.dto';
import {
  PostCarHistoryBodyDto,
  PostCarHistoryParamsDto,
} from './dto/post-car-history.dto';

@Controller('car-history')
export class CarHistoryController {
  constructor(private readonly historyService: CarHistoryService) {}

  @Get('/:carId')
  async all(@Param() params: GetCarHistoryParamsDto) {
    const histories = await this.historyService.carHistories({
      where: {
        carId: params.carId,
      },
    });
    return {
      histories,
    };
  }

  @Post('/:carId')
  async create(
    @Param() params: PostCarHistoryParamsDto,
    @Body() body: PostCarHistoryBodyDto,
  ) {
    const history = await this.historyService.addHistoryRecord(
      params.carId,
      body,
    );
    return {
      history,
    };
  }
}
