// vsource-backend-nest\src\users\users.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUser } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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

  async createUser(createUser: CreateUser) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createUser.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const roles = await this.prisma.role.findMany({
      where: {
        id: {
          in: createUser.roleIds,
        },
      },
    });

    if (!createUser.roleIds?.length) {
      throw new BadRequestException('At least one role is required');
    }

    const hashedPassword = await bcrypt.hash(createUser.password, 10);

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: createUser.name,
          email: createUser.email,
          password: hashedPassword,
          branchId: createUser.branchId,
        },
      });

      await tx.userRole.createMany({
        data: createUser.roleIds.map((roleId) => ({
          userId: user.id,
          roleId,
        })),
      });

      return user;
    });
  }

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }
}
