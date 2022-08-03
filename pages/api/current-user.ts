// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

import type { User } from "@prisma/client";

import { validateRoute } from "@/lib/auth/middlewares";

type Data = {
  user: User;
};

// THIS HANDLER IS GOING TO BE ARGUMENT FOR OUR MIDDLEWARE
const handler = function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  // WE EXPECT TO HAVE USER IN HERE
  user: User
) {
  res.status(200);
  res.json({ user });
};

// WE PASS THIS FUNCTION TO OUR MIDDLEWARE
export default validateRoute(handler);
