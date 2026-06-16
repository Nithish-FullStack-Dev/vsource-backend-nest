import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL missing');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: databaseUrl,
  }),
});

async function main() {
  console.log('🌱 Seeding admin user...');

  const existingUser = await prisma.user.findUnique({
    where: {
      email: 'admin@vsource.com',
    },
  });

  if (existingUser) {
    console.log('ℹ️ Admin already exists');
    return;
  }

  const adminRole = await prisma.role.findFirst({
    where: {
      name: 'Admin',
    },
  });

  if (!adminRole) {
    throw new Error('Admin role not found');
  }

  const branches = await prisma.branch.findMany();

  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@vsource.com',
      password: await bcrypt.hash('Vsource@123', 10),

      roleId: adminRole.id,

      branches: {
        connect: branches.map((branch) => ({
          id: branch.id,
        })),
      },
    },

    include: {
      role: true,
      branches: true,
    },
  });

  console.log('✅ Admin created');
  console.log(admin.email);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
