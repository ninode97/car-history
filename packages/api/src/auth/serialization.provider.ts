import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import IUserSession from './user.interface';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }
  serializeUser(
    user: User,
    done: (err: Error, user: { id: number; role: string }) => void,
  ) {
    done(null, { id: user.id, role: user.userRoleId.toString() });
  }

  deserializeUser(
    payload: { id: number; role: string },
    done: (err: Error, user: IUserSession) => void,
  ) {
    this.authService
      .findById(payload.id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        console.log(err);
        done(err, null);
      });
  }
}
