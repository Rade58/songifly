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
  const [{ value }] = useAuthActor();

  console.log({ value });

  // @ts-ignore
  if (!value["on_auth"]) {
    return null;
  }

  return (
    <>
      <form
        className="auth-form pt-10 border border-gray-500 h-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* <h1>Signup</h1> */}
        <Toggler />
        <div className="w-full flex flex-col justify-center items-center pt-20">
          {/* @ts-ignore */}
          {value["on_auth"]["signup"] && <SigninOrUp signup />}
          {/* @ts-ignore */}
          {value["on_auth"]["signin"] && <SigninOrUp signin />}
        </div>
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
      <style jsx>
        {
          /* css */ `
            .auth-form {
              border: crimson solid 1px;
              height: calc(100vh - 4rem - 33px);
              overflow: hidden;
            }
          `
        }
      </style>
    </>
  );
};

export default AuthForm;
