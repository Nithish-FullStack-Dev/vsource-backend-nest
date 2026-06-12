// vsource-backend-nest\src\lead-degrees\lead-degrees.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LeadDegreesService } from './lead-degrees.service';
import { CreateDegreeDto } from './dto/create-lead-degrees.dto';

@Controller('lead-degrees')
export class DegreesController {
  constructor(private readonly degreesService: LeadDegreesService) {}

  @Get()
  findAll() {
    return this.degreesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateDegreeDto) {
    return this.degreesService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.degreesService.remove(id);
  }
}
