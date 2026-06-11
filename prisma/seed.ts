import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import {
  PrismaClient,
  UserRole,
} from '../src/generated/prisma/client';

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
  console.log('🌱 Seeding database...');

  const dilsukhnagarBranch = await prisma.branch.upsert({
    where: {
      code: 'DSL',
    },
    update: {},
    create: {
      name: 'Dilsukhnagar',
      code: 'DSL',
      city: 'Hyderabad',
    },
  });

  const vijayawadaBranch = await prisma.branch.upsert({
    where: {
      code: 'VJA',
    },
    update: {},
    create: {
      name: 'Vijayawada',
      code: 'VJA',
      city: 'Vijayawada',
    },
  });

  const users = [
    {
      name: 'Super Admin',
      email: 'superadmin@vsourcecrm.com',
      password: 'SuperAdmin@123',
      role: UserRole.super_admin,
      branchId: null,
    },

    {
      name: 'Branch Admin',
      email: 'admin@vsourcecrm.com',
      password: 'Admin@123',
      role: UserRole.admin,
      branchId: dilsukhnagarBranch.id,
    },

    {
      name: 'Counselor',
      email: 'counselor@vsourcecrm.com',
      password: 'Counselor@123',
      role: UserRole.counselor,
      branchId: vijayawadaBranch.id,
    },
  ];

  for (const user of users) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      console.log(
        `ℹ️ User already exists: ${user.email}`,
      );
      continue;
    }

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: await bcrypt.hash(
          user.password,
          10,
        ),
        role: user.role,
        branchId: user.branchId,
      },
    });

    console.log(
      `✅ User created: ${user.email}`,
    );
  }

  console.log('✅ Seed completed');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });