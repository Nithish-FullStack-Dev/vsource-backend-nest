// vsource-backend-nest\src\mbbs-leads\mbbs-leads.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { MbbsLeadsService } from './mbbs-leads.service';
import { CreateMbbsLeadDto } from './dto/create-mbbs-lead.dto';
import { UpdateMbbsLeadDto } from './dto/update-mbbs-lead.dto';

@Controller('mbbs-leads')
export class MbbsLeadsController {
  constructor(private readonly mbbsLeadsService: MbbsLeadsService) {}

  @Post()
  create(@Body() dto: CreateMbbsLeadDto) {
    return this.mbbsLeadsService.create(dto);
  }

  @Get()
  findAll() {
    return this.mbbsLeadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mbbsLeadsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMbbsLeadDto) {
    return this.mbbsLeadsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mbbsLeadsService.remove(id);
  }
}
