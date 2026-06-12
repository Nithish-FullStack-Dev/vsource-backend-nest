// roles.controller.ts

import { Body, Controller, Param, Post } from '@nestjs/common';

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-roles.dto';
import { AssignRolePermissionsDto } from './dto/assign-role-permissions.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('add')
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @Post(':roleId/permissions')
  assignPermissions(
    @Param('roleId') roleId: string,
    @Body()
    dto: AssignRolePermissionsDto,
  ) {
    return this.rolesService.assignPermissions(roleId, dto);
  }
}
