import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
