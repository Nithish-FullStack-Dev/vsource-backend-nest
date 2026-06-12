import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.country.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  create(name: string) {
    return this.prisma.country.create({
      data: {
        name,
      },
    });
  }

  remove(id: string) {
    return this.prisma.country.delete({
      where: {
        id,
      },
    });
  }
}
