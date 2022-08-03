import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

import { SONGIFY_ACCESS_TOKEN } from "@/constants/token";

export const validateRoute = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[SONGIFY_ACCESS_TOKEN];

    if (token) {
      let user: User | null;

      try {
        const payload = jwt.verify(
          token,
          process.env.NODE_ENV === "production"
            ? (process.env.SECRET as string)
            : "shibainu"
        );

        if (payload && typeof payload !== "string") {
          user = await prisma.user.findUnique({
            where: { id: payload.id },
          });

          // EVERYTHING YOU THROW HERE WILL BE CATCHED
          // THAT'S WHY I DID THROW ERROR
          if (!user) {
            throw new Error("Not a real user!");
          }

          // SINCE THIS IS GOING TO BE MIDDLEWARE
          // YOU CAN PASS ADDITIONAL ARGUMENT
          // (SEE HOW I'M GOING TO USE THIS MIDDLEWARE
          // HERE
          // AND IT IS GOING TO BE CLEAR TO YOU WHY I DID PASS A user)

          return handler(req, res);
        }
      } catch (err) {
        if (err instanceof Error) {
          res.status(401);
          return res.json({ errors: [err.message] });
        }
      }
    }

    res.status(401);
    return res.json({ errors: ["Not Authorized!"] });
  };
};
