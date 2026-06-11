// src/branches/dto/create-branch.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  address?: string;

  constructor(name: string, code: string, city?: string, address?: string) {
    this.name = name;
    this.code = code;
    this.city = city;
    this.address = address;
  }
}
