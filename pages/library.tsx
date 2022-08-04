/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ReactNode, ReactElement } from "react";
import { useEffect } from "react";
// import type { NextPage as NP } from "next";
import Router from "next/router";
import type { GetServerSideProps } from "next";

import type { NextPageWithLayout } from "@/pages/_app";
// REMOVE THIS ONE IF YOU USED THIS ONE YOU MADE INSIDE __app
/* export type NextPageWithLayout<P = any, IP = any> = NP<P, IP> & {
  getLayout?: (page: RE) => ReactNode;
}; */

import GradientContainer from "@/components/common/GradientContainer";
import ColorContainer from "@/components/common/ColorContainer";

interface PropsI {
  placeholder: string;
}

export const getServerSideProps: GetServerSideProps<PropsI> = async (ctx) => {
  return {
    props: {
      placeholder: "something",
    },
  };
};

const LibraryPage: NextPageWithLayout<PropsI> = () => {
  return (
    <GradientContainer variant={0} customGradient>
      <ColorContainer variant={0} customColor>
        Hello
      </ColorContainer>
      <div>Hello Library</div>
    </GradientContainer>
  );
};

export default LibraryPage;
