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
  @IsArray()
  @IsUUID('4', { each: true })
  branchIds?: string[];

  @IsString()
  roleId: string;

  constructor(
    name: string,
    email: string,
    password: string,
    roleId: string,
    branchIds?: string[],
  ) {
    this.name = name;
    this.branchIds = branchIds;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
  }
}
