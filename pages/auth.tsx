/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ReactNode, ReactElement } from "react";
import { useEffect } from "react";
import Router from "next/router";
import type { GetServerSideProps } from "next";

import AuthLayout from "@/layouts/AuthLayout";

import authPageActor from "@/machines/auth-page-machine";

import useInterpreterStart from "@/hooks/xstate/useInterpreterStart";

import type { NextPageWithLayout } from "@/pages/_app";

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

  useInterpreterStart(Router.pathname, authPageActor);

  return <div>Sign-in/up {placeholder}</div>;
};

AuthPage.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default AuthPage;
