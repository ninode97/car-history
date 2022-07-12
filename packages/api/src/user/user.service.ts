import { ConflictException, Injectable } from '@nestjs/common';
import { prisma, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(prismaSearch: { where?: Prisma.UserWhereInput }): Promise<User[]> {
    return this.prismaService.user.findMany({
      where: prismaSearch.where,
      include: {
        role: true,
      },
    });
  }

  async findOne(prismaSearch: {
    where?: Prisma.UserWhereInput;
  }): Promise<User | undefined> {
    return this.prismaService.user.findFirst(prismaSearch);
  }

  async create(dto: CreateUserDto) {
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          surname: dto.surname,
          userRoleId: dto.userRoleId,
          birthdate: new Date(),
          isBlocked: false,
          hash: '',
        },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException();
      }
    }
  }
}
