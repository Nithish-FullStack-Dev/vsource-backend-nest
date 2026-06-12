import { Body, Controller, Post } from '@nestjs/common';

import { CreateModuleDto } from './dto/create-module.dto';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post('add')
  create(@Body() dto: CreateModuleDto) {
    return this.modulesService.create(dto);
  }
}
