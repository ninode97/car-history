import { IsString, IsEmail, IsInt, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsInt()
  @IsNumber()
  userRoleId: number;
}
