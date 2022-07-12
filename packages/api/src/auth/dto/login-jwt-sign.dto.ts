import { IsInt } from 'class-validator';

export class LoginJWTSign {
  @IsInt()
  id: number;
}
