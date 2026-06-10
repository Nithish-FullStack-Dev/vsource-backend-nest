import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { PrismaClient, UserRole } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL must be defined');
}

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseUrl }),
});

async function main() {
    const users = [
        {
            name: 'Vihaan Reddy',
            email: 'admin@vsourcecrm.com',
            password: 'Admin@123',
            role: UserRole.admin,
        },
        {
            name: 'Sneha Kapoor',
            email: 'counselor@vsourcecrm.com',
            password: 'Counselor@123',
            role: UserRole.counselor,
        },
    ];

    for (const user of users) {
        const existing = await prisma.user.findUnique({
            where: { email: user.email },
        });

        if (!existing) {
            await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: await bcrypt.hash(user.password, 10),
                    role: user.role,
                },
            });
            console.log(`Created user ${user.email}`);
        } else {
            console.log(`User already exists: ${user.email}`);
        }
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
