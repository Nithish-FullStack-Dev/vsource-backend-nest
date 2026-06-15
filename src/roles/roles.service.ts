// roles.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-roles.dto';
import { AssignRolePermissionsDto } from './dto/assign-role-permissions.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRoleDto) {
    const existing = await this.prisma.role.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (existing) {
      throw new BadRequestException('Role already exists');
    }

    return this.prisma.role.create({
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async assignPermissions(roleId: string, dto: AssignRolePermissionsDto) {
    const role = await this.prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.roleModulePermission.deleteMany({
        where: {
          roleId,
        },
      });

      await tx.roleModulePermission.createMany({
        data: dto.permissions.map((permission) => ({
          roleId,
          moduleId: permission.moduleId,
          canCreate: permission.canCreate,
          canRead: permission.canRead,
          canUpdate: permission.canUpdate,
          canDelete: permission.canDelete,
        })),
      });

      return {
        message: 'Permissions assigned successfully',
      };
    });
  }

  async getAllRoles() {
    return await this.prisma.role.findMany({
      include: {
        modulePermissions: {
          select: {
            canCreate: true,
            canDelete: true,
            canRead: true,
            canUpdate: true,
            moduleId: true,
          },
        },
      },
    });
  }
}
