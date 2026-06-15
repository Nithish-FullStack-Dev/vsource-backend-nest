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
        email: dto.email,
        phone: dto.phone,
        city: dto.city,
        state: dto.state,
        country: dto.country,
        pincode: dto.pincode,
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
            mbbsLeads: true,
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

      email: branch.email,
      phone: branch.phone,

      city: branch.city,
      state: branch.state,

      country: branch.country,
      pincode: branch.pincode,

      address: branch.address,
      status: branch.status,

      createdAt: branch.createdAt,

      usersCount: branch._count.users,
      leadsCount: branch._count.leads + branch._count.mbbsLeads,
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
    const branch = await this.findOne(id);

    if (dto.name || dto.code) {
      const existingBranch = await this.prisma.branch.findFirst({
        where: {
          id: {
            not: id,
          },
          OR: [
            dto.name
              ? {
                  name: dto.name,
                }
              : undefined,

            dto.code
              ? {
                  code: dto.code,
                }
              : undefined,
          ].filter(Boolean) as any,
        },
      });

      if (existingBranch) {
        throw new BadRequestException('Branch name or code already exists');
      }
    }

    return this.prisma.branch.update({
      where: {
        id: branch.id,
      },
      data: {
        name: dto.name,
        code: dto.code,

        email: dto.email,
        phone: dto.phone,

        city: dto.city,
        state: dto.state,

        country: dto.country,
        pincode: dto.pincode,

        address: dto.address,
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
            mbbsLeads: true,
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
      branch._count.mbbsLeads > 0 ||
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
