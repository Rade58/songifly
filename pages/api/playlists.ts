// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

import prisma from "@/lib/prisma";

type Data = {
  name: string;
};

const handler: NextApiHandler = async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //

  const playlists = await prisma.playlist.findMany({});

  res.status(200).json(playlists);
};

export default handler;
