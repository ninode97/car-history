import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Action, PrismaAppAbility } from 'src/casl/casl-ability.factory';
import { CheckPolicies, PoliciesGuard } from 'src/casl/policy-handler';
import { BrandControllerParamsDto } from './dto/brand-controller-params.dto';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { GetBrandModelsParamsDto } from './dto/get-brand-models-params.dto';
import { ModelService } from './model.service';

@Controller('/brand/:id/model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  async getBrands(@Param() param: GetBrandModelsParamsDto) {
    const models = await this.modelService.all({
      where: {
        brandId: param.id,
      },
    });
    return {
      data: models,
    };
  }

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: PrismaAppAbility) =>
    ability.can(Action.Create, 'Model'),
  )
  async createModel(
    @Req() req,
    @Body() dto: CreateCarModelDto,
    @Param() params: BrandControllerParamsDto,
  ) {
    const user = req.user;
    const company = await this.modelService.create({
      name: dto.name,
      brandId: params.id,
      userId: user.id,
    });
    return company;
  }
}
