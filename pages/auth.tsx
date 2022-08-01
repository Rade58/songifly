/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ReactNode, ReactElement } from "react";
import { useEffect } from "react";
// import type { NextPage as NP } from "next";
import Router from "next/router";
import type { GetServerSideProps } from "next";
import AuthLayout from "@/layouts/AuthLayout";

import type { NextPageWithLayout } from "@/pages/_app";
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

const AuthPage: NextPageWithLayout<PropsI> = ({ placeholder }) => {
  console.log({ placeholder });

  useEffect(() => {
    console.log("1. AUTH MOUNTED");
    console.log({ RouterPath: Router.pathname });
    console.log({ RouterPath: Router.asPath });
    console.log("WINDOW");
    console.log(window.location.pathname);
    console.log(window.location.origin);

    return () => {
      console.log("2. AUTH UNMOUNTED");
    };
  }, []);

  return <div>Sign-in/up {placeholder}</div>;
};

AuthPage.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default AuthPage;
