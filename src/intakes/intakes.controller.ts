import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IntakesService } from './intakes.service';

@Controller('intakes')
export class IntakesController {
  constructor(private readonly intakesService: IntakesService) {}

  @Get()
  findAll() {
    return this.intakesService.findAll();
  }

  @Post()
  create(@Body() body: { name: string }) {
    return this.intakesService.create(body.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.intakesService.remove(id);
  }
}
