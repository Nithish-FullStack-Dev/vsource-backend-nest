// src/auth/dto/register.dto.ts

import { IsEmail, IsEnum, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  branchId!: string;
}
