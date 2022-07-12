import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Company, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async all(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompanyWhereUniqueInput;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput;
  }): Promise<Company[]> {
    const { skip, take, cursor, where, orderBy = { name: 'asc' } } = params;
    return this.prisma.company.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.CompanyUncheckedCreateInput) {
    try {
      const company = await this.prisma.company.create({
        data,
      });
      return company;
    } catch (error) {
      console.log(error);
      if (error.code === 'P2002') {
        throw new ConflictException();
      }
      throw new InternalServerErrorException();
    }
  }
}
