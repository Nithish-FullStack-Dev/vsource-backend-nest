import { PartialType } from '@nestjs/mapped-types';
import { CreateMbbsLeadDto } from './create-mbbs-lead.dto';

export class UpdateMbbsLeadDto extends PartialType(CreateMbbsLeadDto) {}
