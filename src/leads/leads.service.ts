// src/leads/leads.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLeadDto) {
    const lastLead = await this.prisma.lead.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        leadNumber: true,
      },
    });

    let nextNumber = 1;

    if (lastLead?.leadNumber) {
      const currentNumber = parseInt(lastLead.leadNumber.replace('LD', ''), 10);

      nextNumber = currentNumber + 1;
    }

    const leadNumber = `LD${String(nextNumber).padStart(4, '0')}`;

    return this.prisma.lead.create({
      data: {
        ...dto,
        leadNumber,
        counsellingDate: dto.counsellingDate
          ? new Date(dto.counsellingDate)
          : null,
      },
    });
  }
  async findAll() {
    return this.prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.lead.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.lead.delete({
      where: {
        id,
      },
    });
  }
}
