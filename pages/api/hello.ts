// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";
import { SONGIFY_ACCESS_TOKEN } from "@/constants/token";

// import { validateRoute } from "@/lib/auth/middlewares";

type Data = {
  name: string;
};

const handler: NextApiHandler = function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = req.cookies[SONGIFY_ACCESS_TOKEN];

  console.log({ token });

  if (token) {
    const payload = jwt.verify(
      token,
      process.env.NODE_ENV === "production"
        ? (process.env.SECRET as string)
        : "shibainu"
    );

    console.log({ payload });
  }

  res.status(200).json({ name: "John Doe" });
};

export default handler;
