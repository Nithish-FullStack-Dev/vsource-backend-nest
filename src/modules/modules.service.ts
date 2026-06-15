import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateModuleDto } from './dto/create-module.dto';

@Injectable()
export class ModulesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateModuleDto) {
    const existing = await this.prisma.module.findUnique({
      where: {
        code: dto.code,
      },
    });

    if (existing) {
      throw new BadRequestException('Module already exists');
    }

    return this.prisma.module.create({
      data: {
        name: dto.name,
        code: dto.code,
        icon: dto.icon,
        sortOrder: dto.sortOrder ?? 0,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async getAll() {
    return await this.prisma.module.findMany();
  }
}
