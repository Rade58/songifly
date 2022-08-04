/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ReactNode, ReactElement } from "react";
import { useEffect } from "react";
// import type { NextPage as NP } from "next";
import Router from "next/router";
import type { GetServerSideProps } from "next";

import type { NextPageWithLayout } from "@/pages/_app";

import GradientContainer from "@/components/common/GradientContainer";

// REMOVE THIS ONE IF YOU USED THIS ONE YOU MADE INSIDE __app
/* export type NextPageWithLayout<P = any, IP = any> = NP<P, IP> & {
  getLayout?: (page: RE) => ReactNode;
}; */

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

const IndexPage: NextPageWithLayout<PropsI> = () => {
  return (
    <GradientContainer variant={6} customGradient>
      <div className="bg-">Index Page</div>
    </GradientContainer>
  );
};

export default IndexPage;
