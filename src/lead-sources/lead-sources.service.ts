import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeadSourcesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.leadSource.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  create(name: string) {
    return this.prisma.leadSource.create({
      data: {
        name,
      },
    });
  }

  remove(id: string) {
    return this.prisma.leadSource.delete({
      where: {
        id,
      },
    });
  }
}