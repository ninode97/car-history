import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Action, PrismaAppAbility } from 'src/casl/casl-ability.factory';
import { CheckPolicies, PoliciesGuard } from 'src/casl/policy-handler';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getCompanies() {
    const companies = await this.companyService.all({});
    return {
      data: companies,
    };
  }

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: PrismaAppAbility) =>
    ability.can(Action.Create, 'Company'),
  )
  async createCompany(@Req() req, @Body() dto: CreateCompanyDto) {
    const user = req.user;
    console.log(user);
    const company = await this.companyService.create({
      name: dto.name,
      userId: user.id,
    });
    return company;
  }
}
