/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ReactNode, ReactElement } from "react";
import { useEffect } from "react";
// import type { NextPage as NP } from "next";
import Router from "next/router";
import type { GetServerSideProps } from "next";
import type { NextPageWithLayout } from "@/pages/_app";

import AuthLayout from "@/layouts/AuthLayout";

interface PropsI {
  placeholder: boolean;
}

export const getServerSideProps: GetServerSideProps<PropsI> = async (ctx) => {
  return {
    props: {
      placeholder: true,
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
