// vsource-backend-nest\src\mbbs-leads\dto\create-mbbs-lead.dto.ts
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMbbsLeadDto {
  @IsOptional()
  @IsString()
  counsellingDate?: string;

  @IsOptional()
  @IsString()
  studentName?: string;

  @IsOptional()
  @IsString()
  fatherName?: string;

  @IsOptional()
  @IsString()
  mobileNumber?: string;

  @IsOptional()
  @IsEmail()
  emailId?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  passport?: string;

  @IsOptional()
  @IsString()
  passportExpireDate?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsString()
  branchId: string;

  @IsOptional()
  @IsString()
  twelfthCollegeName?: string;

  @IsOptional()
  @IsNumber()
  twelfthMarks?: number;

  @IsOptional()
  @IsNumber()
  neetMarks?: number;

  @IsOptional()
  @IsString()
  ept?: string;

  @IsOptional()
  @IsNumber()
  listeningScore?: number;

  @IsOptional()
  @IsNumber()
  readingScore?: number;

  @IsOptional()
  @IsNumber()
  writingScore?: number;

  @IsOptional()
  @IsNumber()
  speakingScore?: number;

  @IsOptional()
  @IsString()
  preferredCountry?: string;

  @IsOptional()
  @IsString()
  preferredIntake?: string;

  @IsOptional()
  @IsString()
  preferredUniversity?: string;

  @IsOptional()
  @IsString()
  preferredCourse?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
