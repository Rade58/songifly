/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import useAuthActor from "@/hooks/xstate/actors/useAuthActor";

import SigninOrUpForm from "./SigninOrUpForm";

interface Props {
  children?: ReactNode;
}

const AuthForm: FC<Props> = () => {
  const [{ value, context }, dispatch] = useAuthActor();

  return (
    <>
      <SigninOrUpForm signup />
      <button
        onClick={() => {
          dispatch("AUTH_MODE_TOGGLE");
        }}
        className="btn btn-accent"
      >
        Auth
      </button>
      <div>{JSON.stringify({ value })}</div>
    </>
  );
};

export default AuthForm;
