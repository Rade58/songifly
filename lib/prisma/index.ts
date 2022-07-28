import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// eslint-disable-next-line
declare namespace global {
  let prisma: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export default prisma;
