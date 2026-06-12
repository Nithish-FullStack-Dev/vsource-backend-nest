import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LeadSourcesService } from './lead-sources.service';

@Controller('lead-sources')
export class LeadSourcesController {
  constructor(private readonly leadSourcesService: LeadSourcesService) {}

  @Get()
  findAll() {
    return this.leadSourcesService.findAll();
  }

  @Post()
  create(@Body() body: { name: string }) {
    return this.leadSourcesService.create(body.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadSourcesService.remove(id);
  }
}
