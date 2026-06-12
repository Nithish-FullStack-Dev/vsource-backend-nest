// roles/dto/create-role.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  constructor(name: string) {
    this.name = name;
  }
}
