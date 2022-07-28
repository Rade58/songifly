import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { artistsData } from "../seed_data/artists";

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    artistsData.map(async (artist) => {
      // upsert MEANS: CREATE OR UPDATE IF EXISTS
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
              return {
                name: song.name,
                duration: song.duration,
                url: song.url,
              };
            }),
          },
        },
      });
    })
  );

  // LET'S CREATE A USER
  //
  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: {
      email: "user@example.com",
    },
    update: {},
    create: {
      email: "user@example.com",
      password: bcrypt.hashSync("password66", salt),
      name: "Satoshy Foobarson",
    },
  });

  // ADDING PLAYLISTS TO THE USER
  // YOU CAN'T UPSERT BECAUSE PLAYLIST DON'T HAVE
  // ANY UNIQUE FILELD, EXPECT ID
  // YOU CAN'T SEARCH BY ID WHEN YOU DON'T HAVE ANY PLAYLIST
  // MOCK DATA WITH A NAME OF THE PLAYLIST AND SIMILAR

  const songs = await prisma.song.findMany();

  await Promise.all([
    new Array(16).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist ${_ + i}`,
          user: {
            connect: {
              id: user.id,
            },
          },
          songs: {
            connect: songs.map(({ id }) => {
              return { id };
            }),
          },
        },
      });
    }),
  ]);
}

// export default async () => {
// return

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
// };
