// vsource-backend-nest\src\lead-degrees\dto\create-lead-degrees.dto.ts
import { IsString } from 'class-validator';

export class CreateDegreeDto {
  @IsString()
  name: string;
}