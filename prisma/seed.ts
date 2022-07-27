import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { artistsData } from "../seed_data/artists";

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    artistsData.map(async (artist) => {
      // upsert MEANS: CREATE OR UPDATE
      return prisma.artist.upsert({
        where: {
          name: artist.name,
        },
        // IF YOU FIND ARTIST THAT ALREADY EXIST
        // UPDATE IT WITH NOTHING (MEANS DON'T UPDATE IT)
        update: {},
        create: {
          name: artist.name,
          // PRISMA IS COOL BECAUSE YOU CAN DO NESTEND INSERTS
          songs: {
            create: artist.songs.map((song) => {
              return { name: song.name, duration: song.duration };
            }),
          },
        },
      });
    })
  );
}

export default async () => {
  return main()
    .catch((err) => {
      console.error(err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
