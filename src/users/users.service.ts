import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserRole } from '../generated/prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async createUser(params: {
        name: string;
        email: string;
        password: string;
        role: UserRole;
    }): Promise<User> {
        return this.prisma.user.create({
            data: {
                name: params.name,
                email: params.email,
                password: params.password,
                role: params.role,
            },
        });
    }
}
