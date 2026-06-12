// src/leads/dto/create-lead.dto.ts

import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { LeadStatus } from 'src/generated/prisma/enums';

export class CreateLeadDto {
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
  place?: string;

  @IsOptional()
  @IsString()
  passport?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsDateString()
  passportExpireDate?: string;

  @IsOptional()
  @IsNumber()
  tenthPercentage?: number;

  @IsOptional()
  @IsInt()
  tenthYearOfPassing?: number;

  @IsOptional()
  @IsNumber()
  twelfthPercentage?: number;

  @IsOptional()
  @IsInt()
  twelfthYearOfPassing?: number;

  @IsOptional()
  @IsString()
  bachelorsCourse?: string;

  @IsOptional()
  @IsString()
  bachelorsUniversityName?: string;

  @IsOptional()
  @IsNumber()
  bachelorsPercentage?: number;

  @IsOptional()
  @IsInt()
  bachelorsYearOfPassing?: number;

  @IsOptional()
  @IsInt()
  backlogs?: number;

  @IsOptional()
  @IsString()
  workExperience?: string;

  @IsOptional()
  @IsString()
  preferredCountry?: string;

  @IsOptional()
  @IsString()
  preferredIntake?: string;

  @IsOptional()
  @IsString()
  preferredCourse?: string;

  @IsOptional()
  @IsNumber()
  greGmatScore?: number;

  @IsOptional()
  @IsNumber()
  quantitativeScore?: number;

  @IsOptional()
  @IsNumber()
  verbalScore?: number;

  @IsOptional()
  @IsNumber()
  analyticalWritingScore?: number;

  @IsOptional()
  @IsString()
  englishTestType?: string;

  @IsOptional()
  @IsNumber()
  listeningScore?: number;

  @IsOptional()
  @IsNumber()
  writingScore?: number;

  @IsOptional()
  @IsNumber()
  readingScore?: number;

  @IsOptional()
  @IsNumber()
  speakingScore?: number;

  @IsOptional()
  @IsString()
  gapsIfAny?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsString()
  branchId?: string;

  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  @IsString()
  assignedCounselorId?: string;

  @IsOptional()
  @IsString()
  nextFollowup?: string;
}
