import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUser {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  branchId?: string;

  @IsString()
  roleId: string;

  constructor(
    name: string,
    email: string,
    password: string,
    roleId: string,
    branchId?: string,
  ) {
    this.name = name;
    this.branchId = branchId;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
  }
}
