import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;
console.log("DATABASE_URL at prisma init:", connectionString);

const adapter = new PrismaNeon({ connectionString });

export const prisma = new PrismaClient({ adapter });