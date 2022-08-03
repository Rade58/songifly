/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ReactNode, ReactElement } from "react";

import type { GetServerSideProps } from "next";

import AuthLayout from "@/layouts/AuthLayout";

import authPageActor from "@/machines/auth-page-machine";

import useInterpreterStartPerPage from "@/hooks/xstate/useInterpreterStartPerPage";

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
  useInterpreterStartPerPage("/auth", authPageActor);

  return null;

  return <div></div>;
};

AuthPage.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

// SEE WHAT I DID HERE
// I ADDED THIS PROPERTY (IT IS NOT SOMETHING BUILT IN
// I MADE UP THIS PROPERTY)
AuthPage.isAuth = true;

export default AuthPage;
