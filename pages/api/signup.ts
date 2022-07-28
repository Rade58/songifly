import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: "hello world";
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ data: "hello world" });
};
