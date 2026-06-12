// vsource-backend-nest\src\countries\countries.controller.ts
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Post()
  create(@Body() body: { name: string }) {
    return this.countriesService.create(body.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countriesService.remove(id);
  }
}
