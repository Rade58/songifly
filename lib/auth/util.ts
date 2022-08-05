import type { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import cookie from "cookie";
// import type { User } from "@prisma/client";

import prisma from "@/lib/prisma";

import { SONGIFY_ACCESS_TOKEN } from "@/constants/token";

export const verifyUser = async (
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  },
  res: ServerResponse
) => {
  const token = req.cookies[SONGIFY_ACCESS_TOKEN];

  if (!token) {
    return {
      redirect: {
        statusCode: 302,
        destination: "/auth",
      },
    };
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

  if (!user) {
    const serializedCookie = cookie.serialize(SONGIFY_ACCESS_TOKEN, "", {
      httpOnly: true,
      // I SETTED THIS
      maxAge: 0,
      sameSite: "lax",
      secure:
        process.env.NODE_ENV !== "development" &&
        process.env.NODE_ENV !== "test",
      path: "/",
    });

    res.setHeader("Set-Cookie", serializedCookie);

    return {
      redirect: {
        statusCode: 302,
        destination: "/auth",
      },
    };
  }

  return user;
};
