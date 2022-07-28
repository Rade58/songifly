/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import { useEffect } from "react";

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

    return () => {
      console.log("2. AUTH UNMOUNTED");
    };
  }, []);

  return <div>Sign-in/up {props.placeholder}</div>;
};

export default AuthPage;
