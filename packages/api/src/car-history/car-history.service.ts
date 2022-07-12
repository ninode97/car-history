import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Car, CarHistory, Prisma } from '@prisma/client';
import { PostCarRequestDto } from 'src/car/dto/post-car-request.dto';
import { PrismaService } from 'src/prisma.service';
import { PostCarHistoryBodyDto } from './dto/post-car-history.dto';

@Injectable()
export class CarHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async carHistories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CarHistoryWhereUniqueInput;
    where?: Prisma.CarHistoryWhereInput;
    orderBy?: Prisma.CarHistoryOrderByWithRelationInput;
  }): Promise<CarHistory[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.carHistory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async addHistoryRecord(
    carId: number,
    body: PostCarHistoryBodyDto,
  ): Promise<CarHistory> {
    const car = await this.prisma.car.findFirst({
      where: {
        id: carId,
      },
    });
    if (!car) {
      throw new BadRequestException(`Car with id of '${carId}' was not found`);
    }
    const user = await this.prisma.user.findFirst({
      where: {
        id: 1,
      },
    });
    if (!user) {
      throw new BadRequestException(`User with id of '${1}' was not found`);
    }
    try {
      const history = await this.prisma.carHistory.create({
        data: {
          carId: carId,
          createdAt: new Date(),
          userId: user.id,
          code: 'MP125',
          price: body.price,
          billCode: body.billCode,
          serviceCompany: body.serviceCompany,
          serviceName: body.serviceName,
          productName: body.productName,
        },
      });
      return history;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
    // const user = await this.prisma.user.findFirst({
    //   where: {
    //     id: 1,
    //   },
    // });
    // const model = await this.prisma.model.findFirst({
    //   where: {
    //     id: data.modelId,
    //   },
    // });
    // const company = await this.prisma.company.findFirst({
    //   where: {
    //     id: data.companyId,
    //   },
    // });
    // try {
    //   return await this.prisma.car.create({
    //     data: {
    //       userId: user.id,
    //       companyId: company.id,
    //       modelId: model.id,
    //       plateCode: data.plateCode,
    //       vinCode: data.vinCode,
    //       year: data.year,
    //       acquiredDate: data.acquiredDate,
    //       insuranceValidFrom: data.insuranceValidFrom,
    //       insuranceExpiresOn: data.insuranceExpiresOn,
    //       technicalInspectionValidFrom: data.technicalInspectionValidFrom,
    //       technicalInspectionExpiresOn: data.technicalInspectionExpiresOn,
    //     },
    //   });
    // } catch (error) {
    //   if (error.code === 'P2002') {
    //     throw new BadRequestException(error);
    //   }
    //   throw new InternalServerErrorException('');
    // }
  }
}
