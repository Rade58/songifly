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

  const { email, password, username } = req.body as {
    email: string;
    password: string;
    username: string;
  };

  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ errors: ["Missing email and/or password and/or username!"] });
  }

  const salt = bcrypt.genSaltSync();

  const passwordHash = bcrypt.hashSync(password, salt);

  try {
    // USER WITH A SAME EMAIL CAN ALREADY EXIST IN DATABASE
    // THATS WHY I PRIMARILY USED THIS TRY CATCH BLOCK

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name: username,
      },
    });

    const token = jwt.sign(
      { email, id: user.id, date: new Date() },
      process.env.NODE_ENV === "production"
        ? (process.env.SECRET as string)
        : "shibainu",
      {
        expiresIn: "8h",
      }
    );

    // YOU CCAN CALL COOKIE AS YOU PLEASE
    // GOOD IDEA IS TO KEEP THAT NAME IN SOME ENV VARIABLE
    // IN SOME FILE
    // TOSO: WE WILL DO THAT

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

    return res.status(201).json({ user });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);

      return res.status(401).json({
        errors: [err.message],
      });
    }
  }
};

// WE CAN TEST THIS WITH HTTPIE, BUT REMEMMBER THAT HTTPIE IS CLI TOOL
// BUT IT IS BETTER TO TEST THIS IN INSOMNIA IF YOU WANT TO
// HAVE TO ACCESS TO THE COOKIE SINCE INSOMNIA ACTS LIKE A BROWSER

// BUT ANYWAYS, IF YOU TEST THIS WITH HTTPIE USER WILL BE CREATED IN DATABASE
// HERE YOU GO

//                http POST :3000/api/signup email=bobby@example.com password=shibainu username="John Doe"
