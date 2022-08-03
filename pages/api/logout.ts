/* eslint import/no-anonymous-default-export: 0 */
import type { NextApiRequest, NextApiResponse } from "next";

import cookie from "cookie";

import { SONGIFY_ACCESS_TOKEN } from "@/constants/token";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // CLEARING THE COOKIE
  const serializedCookie = cookie.serialize(SONGIFY_ACCESS_TOKEN, "", {
    httpOnly: true,
    // I SETTED THIS
    maxAge: 0,
    sameSite: "lax",
    secure:
      process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test",
    path: "/",
  });

  res.setHeader("Set-Cookie", serializedCookie);

  res.writeHead(302, { Location: "/" });

  return res.end();
};

// TEST WITH BROWSER
// GO TO

// http:localhost:3000/api/logout
// COOKIE SHOULD BE CLEARED AND YOU SHOULD BE REDIRECTED TO /
