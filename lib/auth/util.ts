import type { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

// import type { User } from "@prisma/client";

import prisma from "@/lib/prisma";

import { SONGIFY_ACCESS_TOKEN } from "@/constants/token";

export const verifyUser = async (
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  }
) => {
  const token = req.cookies[SONGIFY_ACCESS_TOKEN];

  if (!token) {
    return null;
  }

  const payload = jwt.verify(
    token || "",
    process.env.NODE_ENV === "production"
      ? (process.env.SECRET as string)
      : "shibainu"
  );

  const user = await prisma.user.findUnique({
    where: {
      email: typeof payload !== "string" ? payload.email : "none",
    },
  });

  return user;
};
