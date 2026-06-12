import { IsEmail, IsString } from 'class-validator';

export class CreateUser {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  branchId?: string;

  roleIds: string[];

  constructor(
    name: string,
    email: string,
    password: string,
    roleIds: string[],
    branchId?: string,
  ) {
    this.name = name;
    this.branchId = branchId;
    this.email = email;
    this.password = password;
    this.roleIds = roleIds;
  }
}
