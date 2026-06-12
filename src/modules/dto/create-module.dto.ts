import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }
}
