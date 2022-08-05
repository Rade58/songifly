/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { ReactElement } from "react";
import type { GetServerSideProps, NextPage as NP } from "next";

import type { Playlist, Song } from "@prisma/client";
import prisma from "@/lib/prisma";

import type { NextPageWithLayout } from "@/pages/_app";

import GradientContainer from "@/components/common/GradientContainer";
import ColorContainer from "@/components/common/ColorContainer";

import { verifyUser } from "@/lib/auth/util";

interface PropsI {
  placeholder: string;
}

export const getServerSideProps: GetServerSideProps<PropsI> = async (ctx) => {
  const user = await verifyUser(ctx.req);

  if (!user) {
    await fetch("/api/logout");

    return {
      redirect: {
        statusCode: 302,
        destination: "/auth",
      },
    };
  }

  return {
    props: {
      placeholder: "",
    },
  };
};

const PlaylistPage: NextPageWithLayout<PropsI> = ({ placeholder }) => {
  return <div>Try</div>;
};

export default PlaylistPage;
