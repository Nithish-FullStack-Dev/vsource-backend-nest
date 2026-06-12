// vsource-backend-nest\src\lead-universities\lead-universities.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUniversityDto } from './dto/create-university.dto';

@Injectable()
export class LeadUniversitiesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.leadUniversity.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  create(dto: CreateUniversityDto) {
    return this.prisma.leadUniversity.create({
      data: {
        name: dto.name,
      },
    });
  }

  remove(id: string) {
    return this.prisma.leadUniversity.delete({
      where: {
        id,
      },
    });
  }
}
