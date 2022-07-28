/* eslint import/no-anonymous-default-export: 0 */
import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import prisma from "@/lib/prisma";

type Data = {
  data?: "hello world";
  errors?: string[];
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log({ user });

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
      process.env.NODE_ENV === "development"
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

    const serializedCookie = cookie.serialize("Bearer token", token, {
      httpOnly: true,
      maxAge: 28800,
      sameSite: true,
      secure:
        process.env.NODE_ENV !== "development" ||
        process.env.NODE_ENV !== "development",
    });

    res.setHeader("Set-Cookie", serializedCookie);
  } catch (err) {
    return res
      .status(401)
      .json({ errors: ["User with provided email already exists!"] });
  }

  res.status(200).json({ data: "hello world" });
};
