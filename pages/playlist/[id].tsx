/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { ReactElement } from "react";
import type { GetServerSideProps, NextPage as NP } from "next";

import type { Playlist, Song } from "@prisma/client";
import prisma from "@/lib/prisma";

import type { NextPageWithLayout } from "@/pages/_app";

import GradientContainer from "@/components/common/GradientContainer";
import ColorContainer from "@/components/common/ColorContainer";

interface PropsI {
  playlist: Playlist & {
    songs: Song[];
  };
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
      include: {
        songs: true,
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

  /* return {
    props: {
      playlist: undefined,
    },
  }; */
};

const PlaylistPage: NextPageWithLayout<PropsI> = ({ playlist }) => {
  const { colorVariant, name } = playlist;

  // console.log(colorVariant);

  return (
    <GradientContainer variant={colorVariant} customGradient>
      <ColorContainer
        variant={colorVariant}
        customColor
        mode="playlist"
        title={name}
        someData="Soft Jazz For All of your activities"
      ></ColorContainer>
      <div>Hello Playlist</div>
    </GradientContainer>
  );
};

export default PlaylistPage;
