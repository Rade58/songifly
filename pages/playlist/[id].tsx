/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { ReactElement } from "react";
import type { GetServerSideProps, NextPage as NP } from "next";

import type { Playlist } from "@prisma/client";
import prisma from "@/lib/prisma";

import type { NextPageWithLayout } from "@/pages/_app";

interface PropsI {
  playlist?: Playlist | null;
}

type paramsType = {
  id: string;
};

// @ts-ignore
export const getServerSideProps: GetServerSideProps<
  PropsI,
  paramsType
> = async (ctx) => {
  const { params } = ctx;

  if (params) {
    // FETCH PLAYLIST
    const playlist = await prisma.playlist.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    return {
      props: {
        playlist: {
          ...playlist,
          createdAt: playlist?.createdAt.toISOString(),
          updatedAt: playlist?.updatedAt.toISOString(),
        },
      },
    };
  } else {
    return {
      redirect: {
        statusCode: 302,
        destination: "/",
      },
    };
  }

  return {
    props: {
      playlist: undefined,
    },
  };
};

const PlaylistPage: NextPageWithLayout<PropsI> = ({ playlist }) => {
  return <div>{playlist?.name}</div>;
};

export default PlaylistPage;
