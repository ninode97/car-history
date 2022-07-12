import { Controller, Get } from '@nestjs/common';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async getBrands() {
    const brands = await this.brandService.all({});
    return {
      data: brands,
    };
  }
}
