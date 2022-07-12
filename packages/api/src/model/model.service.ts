import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ModelService {
  constructor(private prisma: PrismaService) {}

  async all(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ModelWhereUniqueInput;
    where?: Prisma.ModelWhereInput;
    orderBy?: Prisma.ModelOrderByWithRelationInput;
  }): Promise<Model[]> {
    const { skip, take, cursor, where, orderBy = { name: 'asc' } } = params;
    return this.prisma.model.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.ModelUncheckedCreateInput) {
    try {
      const model = await this.prisma.model.create({
        data,
      });
      return model;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException();
      }
      throw new InternalServerErrorException();
    }
  }
}
