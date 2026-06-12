// vsource-backend-nest\src\lead-universities\dto\create-university.dto.ts
import { IsString } from 'class-validator';

export class CreateUniversityDto {
  @IsString()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
