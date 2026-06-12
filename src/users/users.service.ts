// vsource-backend-nest\src\users\users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUser } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        branch: true,
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async createUser(createUser: CreateUser) {}
}
