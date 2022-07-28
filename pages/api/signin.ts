/* eslint import/no-anonymous-default-export: 0 */
import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import type { User } from "@prisma/client";

import prisma from "@/lib/prisma";

import { SONGIFY_ACCESS_TOKEN } from "@/constants/token";

type Data = {
  user?: User;
  errors?: string[];
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    return res.status(400).json({ errors: ["Wrong http method!"] });
  }

  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  if (!email || !password) {
    return res.status(400).json({ errors: ["Missing email and/or password!"] });
  }

  try {
    const posibleUser = await prisma.user.findUnique({
      where: { email },
    });

    if (posibleUser === null) {
      return res.status(401).json({
        errors: ["Email doesn't exist, try creating aaccount first!"],
      });

      /* res.writeHead(302, { Location: "/signup" });
      return res.end(); */
    }

    // compare password hashes

    bcrypt.compareSync(password, posibleUser.password);

    if (!bcrypt.compareSync(password, posibleUser.password)) {
      return res
        .status(401)
        .json({ errors: ["Unauthorized, wrong password!"] });
    }

    const token = jwt.sign(
      { email, id: posibleUser.id, date: new Date() },
      process.env.NODE_ENV === "production"
        ? (process.env.SECRET as string)
        : "shibainu",
      {
        expiresIn: "8h",
      }
    );

    const serializedCookie = cookie.serialize(SONGIFY_ACCESS_TOKEN, token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      sameSite: "lax",
      secure:
        process.env.NODE_ENV !== "development" &&
        process.env.NODE_ENV !== "test",
      path: "/",
    });

    res.setHeader("Set-Cookie", serializedCookie);

    return res
      .status(201)
      .json({ user: { ...posibleUser, password: "__undefined__" } });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);

      return res.status(401).json({
        errors: [err.message],
      });
    }
  }
};

// TEST WITH HTTPIE
//      http POST :3000/api/signin email=robertlee@example.com password=shibainu
