import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IntakesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.intake.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  create(name: string) {
    return this.prisma.intake.create({
      data: {
        name,
      },
    });
  }

  remove(id: string) {
    return this.prisma.intake.delete({
      where: {
        id,
      },
    });
  }
}