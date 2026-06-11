// src/auth/dto/register.dto.ts

import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../../generated/prisma/client';

export class RegisterDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.counselor;

  @IsString()
  branchId!: string;
}
