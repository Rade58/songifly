import type { User } from "@prisma/client";

import prisma from "@/lib/prisma";

export const createPlaylists = async (user: User, playlistNames: string[]) => {
  const songs = await prisma.song.findMany({});

  return Promise.all([
    playlistNames.map(async (name) => {
      return prisma.playlist.create({
        data: {
          name,
          colorVariant: Math.round(Math.random() * 6),
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
};
