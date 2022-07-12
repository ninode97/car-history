import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { User, Prisma, Car } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PostCarRequestDto } from './dto/post-car-request.dto';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async car(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async cars(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CarWhereUniqueInput;
    where?: Prisma.CarWhereInput;
    orderBy?: Prisma.CarOrderByWithRelationInput;
  }): Promise<Car[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.car.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        model: {
          include: {
            Brand: true,
          },
        },
      },
    });
  }

  async createCar(data: PostCarRequestDto): Promise<Car> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: 1,
      },
    });
    const model = await this.prisma.model.findFirst({
      where: {
        id: data.modelId,
      },
    });
    const company = await this.prisma.company.findFirst({
      where: {
        id: data.companyId,
      },
    });

    try {
      return await this.prisma.car.create({
        data: {
          userId: user.id,
          companyId: company.id,
          modelId: model.id,
          plateCode: data.plateCode,
          vinCode: data.vinCode,
          year: data.year,
          acquiredDate: data.acquiredDate,
          insuranceValidFrom: data.insuranceValidFrom,
          insuranceExpiresOn: data.insuranceExpiresOn,
          technicalInspectionValidFrom: data.technicalInspectionValidFrom,
          technicalInspectionExpiresOn: data.technicalInspectionExpiresOn,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(error);
      }
      throw new InternalServerErrorException('');
    }
  }

  async updateCar(params: {
    where: Prisma.CarWhereUniqueInput;
    data: Prisma.CarUpdateInput;
  }): Promise<Car> {
    const { where, data } = params;
    return this.prisma.car.update({
      data,
      where,
    });
  }

  async deleteCar(where: Prisma.CarWhereUniqueInput): Promise<Car> {
    return this.prisma.car.delete({
      where,
    });
  }
}
