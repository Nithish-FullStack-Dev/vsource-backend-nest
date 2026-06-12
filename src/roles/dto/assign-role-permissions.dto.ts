import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

class ModulePermissionDto {
  @IsString()
  moduleId: string;

  @IsBoolean()
  canCreate: boolean;

  @IsBoolean()
  canRead: boolean;

  @IsBoolean()
  canUpdate: boolean;

  @IsBoolean()
  canDelete: boolean;

  constructor(
    moduleId: string,
    canCreate: boolean,
    canRead: boolean,
    canUpdate: boolean,
    canDelete: boolean,
  ) {
    this.canCreate = canCreate;
    this.canDelete = canDelete;
    this.canUpdate = canUpdate;
    this.canRead = canRead;
    this.moduleId = moduleId;
  }
}

export class AssignRolePermissionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModulePermissionDto)
  permissions: ModulePermissionDto[];

  constructor(permissions: ModulePermissionDto[]) {
    this.permissions = permissions;
  }
}
