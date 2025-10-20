import { PrismaClient } from "../generated/prisma";

const g = globalThis;
export const prisma = g.prisma ?? new PrismaClient(); // Singleton instance
if (process.env.NODE_ENV !== "production") g.prisma = prisma;