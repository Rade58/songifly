/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useEffect } from "react";
import Router from "next/router";
import type { GetServerSideProps, NextPage as NP } from "next";

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

const AuthPage: NP<PropsI> = (props) => {
  //

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

  return <div>Sign-in/up {props.placeholder}</div>;
};

export default AuthPage;
