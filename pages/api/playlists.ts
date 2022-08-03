// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import type { Playlist, User } from "@prisma/client";

import { validateRoute } from "@/lib/auth/middlewares";

/* type Data = {
  name: string;
}; */
export type Data = {
  id: number;
  name: string;
}[];

const handler = async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  user: User
) {
  //

  const playlists = await prisma.playlist.findMany({
    where: {
      user: {
        id: user.id,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  res.status(200).json(playlists);
};

export default validateRoute(handler);
