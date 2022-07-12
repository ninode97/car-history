import { Prisma } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

@Exclude()
export class UserRoleDto {
  @Expose()
  @IsNumber()
  @IsInt()
  id: number;

  @Expose()
  name: string;
}

@Exclude()
export class UserDto {
  @Expose()
  @IsNumber()
  @IsInt()
  id: number;
  @Expose()
  @IsString()
  @IsEmail()
  email: string;
  @Expose()
  @IsString()
  name: string;
  @Expose()
  @IsString()
  surname: string;
  @Expose()
  @IsDate()
  birthdata: Date;
  @Expose()
  @IsBoolean()
  isBlocked: boolean;
  @Expose()
  role: UserRoleDto;
  @Expose()
  @IsInt()
  @IsNumber()
  userRoleId: number;
}

@Exclude()
export class UsersRequestDto {
  @Expose()
  @IsNumber()
  @IsInt()
  @IsOptional()
  skip?: number = 0;
  @Expose()
  @IsNumber()
  @IsInt()
  @IsOptional()
  take?: number = 10;
  @Expose()
  @IsOptional()
  @IsString()
  email?: string;
  @Expose()
  @IsString()
  @IsOptional()
  name?: string;
  @Expose()
  @IsString()
  @IsOptional()
  surname?: string;
}

@Exclude()
export class UsersResponseDto {
  @Expose()
  @IsArray()
  @Type(() => UserDto)
  users: UserDto[];
  @Expose()
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @IsInt()
  skip = 0;
  @Expose()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Max(100)
  take = 10;
  @Expose()
  @IsOptional()
  cursor?: Prisma.CarWhereUniqueInput;
  @Expose()
  @IsOptional()
  where?: Prisma.CarWhereInput;
}
