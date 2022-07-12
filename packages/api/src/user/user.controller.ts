import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  classToPlain,
  instanceToInstance,
  plainToClass,
  plainToInstance,
} from 'class-transformer';
import { Action, PrismaAppAbility } from 'src/casl/casl-ability.factory';
import { CheckPolicies, PoliciesGuard } from 'src/casl/policy-handler';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRequestDto, UsersResponseDto, UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: PrismaAppAbility) =>
    ability.can(Action.Read, 'User'),
  )
  async getUser(@Param() dto: UsersRequestDto): Promise<UsersResponseDto> {
    const users = await this.userService.find({});
    return {
      skip: dto.skip,
      take: dto.take,
      users: plainToInstance(UserDto, users),
    };
  }

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: PrismaAppAbility) =>
    ability.can(Action.Create, 'User'),
  )
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return {
      user,
    };
  }

  @Put('/:userId')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: PrismaAppAbility) =>
    ability.can(Action.Update, 'User'),
  )
  updateUser() {
    console.log('update user');
    return {};
  }

  @Delete('/:userId')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: PrismaAppAbility) =>
    ability.can(Action.Delete, 'User'),
  )
  removeUser() {
    console.log('remove user');
    return {};
  }

  @Get()
  getUsers() {
    return [];
  }

  @Get('/roles')
  getRoles() {
    return [];
  }
}
function Params() {
  throw new Error('Function not implemented.');
}
