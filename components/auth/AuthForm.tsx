/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import useAuthActor from "@/hooks/xstate/actors/useAuthActor";

import SigninOrUp from "./SigninOrUp";
import Toggler from "./Toggler";

interface Props {
  children?: ReactNode;
}

const AuthForm: FC<Props> = () => {
  const [{ value, context }, dispatch] = useAuthActor();

  return (
    <form className="w-full flex flex-col justify-center items-center pt-20">
      {/* <h1>Signup</h1> */}
      <Toggler />
      <SigninOrUp signup />
      {/*    <button
        onClick={() => {
          dispatch("AUTH_MODE_TOGGLE");
        }}
        className="btn btn-accent"
      >
        Auth
      </button>
      <div>{JSON.stringify({ value })}</div> */}
    </form>
  );
};

export default AuthForm;
