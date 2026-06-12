// vsource-backend-nest\src\lead-universities\lead-universities.controller.ts
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { LeadUniversitiesService } from './lead-universities.service';
import { CreateUniversityDto } from './dto/create-university.dto';

@Controller('lead-universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: LeadUniversitiesService) {}

  @Get()
  findAll() {
    return this.universitiesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateUniversityDto) {
    return this.universitiesService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universitiesService.remove(id);
  }
}
