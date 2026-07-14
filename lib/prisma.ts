import { PrismaClient } from '@prisma/client';
import path from 'path';

// Since the DB is in the server directory, we must provide the absolute path to it
// or run Prisma with the correct env var.
const dbPath = path.resolve(process.cwd(), '../server/prisma/dev.db');

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
