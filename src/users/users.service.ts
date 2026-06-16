// vsource-backend-nest\src\users\users.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUser } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        branches: true,
        role: {
          include: {
            modulePermissions: {
              select: {
                canCreate: true,
                canDelete: true,
                canRead: true,
                canUpdate: true,
                moduleId: true,
                module: {
                  select: {
                    code: true,
                    name: true,
                    sortOrder: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        branches: true,
        role: true,
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

    const role = await this.prisma.role.findUnique({
      where: {
        id: createUser.roleId,
      },
    });

    if (!role) {
      throw new BadRequestException('Invalid role selected');
    }

    const hashedPassword = await bcrypt.hash(createUser.password, 10);

    return this.prisma.user.create({
      data: {
        name: createUser.name,
        email: createUser.email,
        password: hashedPassword,
        roleId: createUser.roleId,
        branches: {
          connect:
            createUser.branchIds?.map((id) => ({
              id,
            })) ?? [],
        },
      },
      include: {
        branches: true,
        role: true,
      },
    });
  }

  async getAllUsers() {
    return await this.prisma.user.findMany({
      include: {
        branches: true,
        role: true,
      },
    });
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        branches: true,
        role: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: {
          email: updateUserDto.email,
        },
      });

      if (existingEmail) {
        throw new BadRequestException('Email already exists');
      }
    }

    // let hashedPassword: string | undefined;

    // if (updateUserDto.password) {
    //   hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    // }

    if (updateUserDto.roleId) {
      const role = await this.prisma.role.findUnique({
        where: {
          id: updateUserDto.roleId,
        },
      });

      if (!role) {
        throw new BadRequestException('Role not found');
      }
    }

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...(updateUserDto.name && {
          name: updateUserDto.name,
        }),

        ...(updateUserDto.email && {
          email: updateUserDto.email,
        }),

        ...(updateUserDto.branchId !== undefined && {
          branchId: updateUserDto.branchId,
        }),

        ...(updateUserDto.roleId && {
          roleId: updateUserDto.roleId,
        }),
      },
    });
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
