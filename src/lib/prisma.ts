import { PrismaClient } from "@prisma/client";
import { createPool } from "mysql2/promise";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const connectionString = process.env.DATABASE_URL!;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: ReturnType<typeof createPool> | undefined;
};

// Bước A: Cấp cho máy móc một Pool để truyền dòng thác dữ liệu DB
export const pool = globalForPrisma.pool ?? createPool(connectionString);

if (process.env.NODE_ENV !== "production") globalForPrisma.pool = pool;

// Bước B: Chắp Nối Adapter Adapter nối tiếng nói từ Vercel ra thẳng TiDB Cloud (Chặn luôn lỗi [PrismaClientConstructorValidationError] !!!)
const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  connectionLimit: 5,
});

// Bước C: Sinh Mệnh Hệ Thống DB Của Bạn
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,  // VÌ DÒNG NÀY ĐÃ TỒN TẠI, VERCEL VÀ NEXTJS 15 HOÀN TOÀN CÚI ĐẦU CHÀO NHIỆT LIỆT !
    log:
      process.env.NODE_ENV === "development" ? [ "query", "error", "warn" ] : [ "error" ],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
