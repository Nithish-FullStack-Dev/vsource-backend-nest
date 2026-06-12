// vsource-backend-nest\src\lead-degrees\lead-degrees.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDegreeDto } from './dto/create-lead-degrees.dto';

@Injectable()
export class LeadDegreesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.leadDegree.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  create(dto: CreateDegreeDto) {
    return this.prisma.leadDegree.create({
      data: {
        name: dto.name,
      },
    });
  }

  remove(id: string) {
    return this.prisma.leadDegree.delete({
      where: {
        id,
      },
    });
  }
}