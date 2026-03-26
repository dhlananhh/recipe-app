import { PrismaClient } from "@prisma/client";
import { createPool } from "mysql2/promise";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const connectionString = process.env.DATABASE_URL!;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: ReturnType<typeof createPool> | undefined;
};

export const pool = globalForPrisma.pool ?? createPool(connectionString);

if (process.env.NODE_ENV !== "production") globalForPrisma.pool = pool;

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  connectionLimit: 5,
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? [ "query", "error", "warn" ]
        : [ "error" ],
  });

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma;
