// src/branches/branches.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBranchDto) {
    const exists = await this.prisma.branch.findFirst({
      where: {
        OR: [
          {
            name: dto.name,
          },
          {
            code: dto.code,
          },
        ],
      },
    });

    if (exists) {
      throw new BadRequestException('Branch name or code already exists');
    }

    return this.prisma.branch.create({
      data: {
        name: dto.name,
        code: dto.code,
        city: dto.city,
        address: dto.address,
      },
    });
  }

  async findAll() {
    const branches = await this.prisma.branch.findMany({
      include: {
        _count: {
          select: {
            users: true,
            leads: true,
            students: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return branches.map((branch) => ({
      id: branch.id,
      name: branch.name,
      code: branch.code,
      city: branch.city,
      address: branch.address,
      createdAt: branch.createdAt,

      usersCount: branch._count.users,
      leadsCount: branch._count.leads,
      studentsCount: branch._count.students,
    }));
  }

  async findOne(id: string) {
    const branch = await this.prisma.branch.findUnique({
      where: {
        id,
      },
    });

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    return branch;
  }

  async update(id: string, dto: UpdateBranchDto) {
    await this.findOne(id);

    return this.prisma.branch.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: string) {
    const branch = await this.prisma.branch.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            users: true,
            leads: true,
            students: true,
          },
        },
      },
    });

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    if (
      branch._count.users > 0 ||
      branch._count.leads > 0 ||
      branch._count.students > 0
    ) {
      throw new BadRequestException(
        'Cannot delete branch because records are linked to it',
      );
    }

    return this.prisma.branch.delete({
      where: {
        id,
      },
    });
  }
}
