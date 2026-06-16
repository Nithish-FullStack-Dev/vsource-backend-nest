import {
  ArrayUnique,
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
  @ArrayUnique()
  @IsUUID('4', { each: true })
  branchIds?: string[];

  @IsUUID()
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
