import { PrismaPostgresAdapter } from "@prisma/adapter-ppg";
import { env } from "@tabularium/env/server";

import { PrismaClient } from "../prisma/generated/client";

export function createPrismaClient() {
  const adapter = new PrismaPostgresAdapter({
    connectionString: env.DATABASE_URL,
  });

  return new PrismaClient({ adapter });
}

const prisma = createPrismaClient();
export default prisma;
