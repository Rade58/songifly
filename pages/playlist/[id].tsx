/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import type { GetServerSideProps, NextPage as NP } from "next";

import { useRouter } from "next/router";

import type { Playlist, Song, User } from "@prisma/client";
import prisma from "@/lib/prisma";

import type { NextPageWithLayout } from "@/pages/_app";

import GradientContainer from "@/components/common/GradientContainer";
import ColorContainer from "@/components/common/ColorContainer";

import SongsTable from "@/components/playlist/SongsTable";

import { verifyUser } from "@/lib/auth/util";

import usePlayerActor from "@/hooks/xstate/actors/usePlayerActor";

interface PropsI {
  playlist: Playlist & {
    songs: (Song & {
      artist: {
        name: string;
        id: number;
      };
    })[];
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
  const data = await verifyUser(ctx.req, ctx.res);

  // @ts-ignore
  if (!data.email) {
    return data;
  }

  const { params } = ctx;

  if (params) {
    // FETCH PLAYLIST
    const playlist = await prisma.playlist.findFirst({
      where: {
        // id: parseInt(params.id),
        id: +params.id,
        user: {
          // @ts-ignore
          id: data.id,
          // @ts-ignore
          email: data.email,
        },
      },
      include: {
        songs: {
          include: {
            artist: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      props: {
        playlist: {
          ...playlist,
          createdAt: playlist?.createdAt.toISOString(),
          updatedAt: playlist?.updatedAt.toISOString(),
          songs: playlist?.songs.map((song) => ({
            ...song,
            updatedAt: song.updatedAt.toISOString(),
            createdAt: song.createdAt.toISOString(),
          })),
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
  const { colorVariant, name, songs } = playlist;

  const {
    query: { id: playlistId },
  } = useRouter();

  const [
    {
      context: { currentVisitedSongs },
    },
    dispatch,
  ] = usePlayerActor();

  useEffect(() => {
    if (!currentVisitedSongs && playlistId) {
      dispatch({
        type: "VISIT_PLAYLIST",
        payload: {
          songs: {
            playlistId: +(playlistId as string),
            tracks: songs,
          },
        },
      });
    }

    if (currentVisitedSongs && playlistId) {
      if (currentVisitedSongs.playlistId !== +(playlistId as string)) {
        dispatch({
          type: "VISIT_PLAYLIST",
          payload: {
            songs: {
              playlistId: +(playlistId as string),
              tracks: songs,
            },
          },
        });
      }
    }

    console.log("playlit mounted");
  }, [playlistId, currentVisitedSongs]);

  return (
    <GradientContainer variant={colorVariant} customGradient>
      <ColorContainer
        variant={colorVariant}
        customColor
        mode="playlist"
        title={name}
        someData={`${songs.length} songs`}
      ></ColorContainer>
      <div>
        {/* <pre>{JSON.stringify({ playlist }, null, 2)}</pre> */}
        <SongsTable songs={songs} />
      </div>
    </GradientContainer>
  );
};

export default PlaylistPage;
