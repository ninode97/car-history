import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '@prisma/client';
import IUserSession from './user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  get users() {
    return [];
  }
  async getUserByEmail(email: string) {
    const user = await this.userService.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async validateUser(payload: LoginUserDto): Promise<IUserSession> {
    const user = await this.getUserByEmail(payload.email);
    if (!user || !(await compare(payload.password, user.hash))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      userRoleId: user.userRoleId,
    };
  }

  async findById(id: number): Promise<Omit<User, 'hash'>> {
    const user = await this.userService.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }
    const { hash: _, ...partialuser } = user;
    return partialuser;
  }

  async destroySession(req: any, res: any) {
    return new Promise((resolve, reject) => {
      req.logout();
      req.session.destroy((err) => {
        if (err) {
          return reject(new InternalServerErrorException());
        }
        res.clearCookie('connect.sid');
        return resolve(true);
      });
    });
  }
}
