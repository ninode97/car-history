import { IsEmail, IsString } from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
