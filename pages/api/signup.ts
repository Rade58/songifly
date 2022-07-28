/* eslint import/no-anonymous-default-export: 0 */
import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import prisma from "@/lib/prisma";

type Data = {
  data: "hello world";
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const user = await prisma.user.findFirst();

  console.log({ user });

  res.status(200).json({ data: "hello world" });
};
