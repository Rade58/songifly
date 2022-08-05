/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ReactNode, ReactElement } from "react";
import { useEffect } from "react";
// import type { NextPage as NP } from "next";
import Router from "next/router";
import type { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";
import type { User, Artist } from "@prisma/client";

import prisma from "@/lib/prisma";

import { SONGIFY_ACCESS_TOKEN } from "@/constants/token";

import type { NextPageWithLayout } from "@/pages/_app";

import GradientContainer from "@/components/common/GradientContainer";
import ColorContainer from "@/components/common/ColorContainer";
import Artists from "@/components/mainpage/Artists";

// REMOVE THIS ONE IF YOU USED THIS ONE YOU MADE INSIDE __app
/* export type NextPageWithLayout<P = any, IP = any> = NP<P, IP> & {
  getLayout?: (page: RE) => ReactNode;
}; */

interface PropsI {
  user: User & {
    _count: {
      playlists: number;
    };
  };
  artists: {
    name: string;
  }[];
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<PropsI> = async (ctx) => {
  const token = ctx.req.cookies[SONGIFY_ACCESS_TOKEN];

  const payload = jwt.verify(
    token || "",
    process.env.NODE_ENV === "production"
      ? (process.env.SECRET as string)
      : "shibainu"
  );

  console.log({ payload });

  const user = await prisma.user.findUnique({
    where: {
      email: typeof payload !== "string" ? payload.email : "none",
    },
    include: {
      _count: {
        select: {
          playlists: true,
        },
      },
    },
  });

  const artists = await prisma.artist.findMany({
    select: {
      name: true,
    },
  });

  if (user) {
    return {
      props: {
        user: {
          ...user,
          password: "__password__",
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
        artists,
      },
    };
  }
};

const IndexPage: NextPageWithLayout<PropsI> = ({
  user: {
    _count: { playlists: playlistNumber },
    name,
  },
  artists,
}) => {
  return (
    <GradientContainer defaultGradient>
      <ColorContainer
        defaultColor
        mode="profile"
        title={name}
        someData={`${playlistNumber} Public Playlist${
          playlistNumber > 1 ? "s" : ""
        }`}
      ></ColorContainer>

      <Artists artists={artists} />
    </GradientContainer>
  );
};

export default IndexPage;
