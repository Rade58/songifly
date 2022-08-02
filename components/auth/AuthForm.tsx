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
      <div className="auth-form w-full">
        <Toggler />
        <form
          className="border-0 border-gray-500 flex flex-col justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* <h1>Signup</h1> */}
          {/* @ts-ignore */}
          {value["on_auth"]["signup"] && <SigninOrUp signup />}
          {/* @ts-ignore */}
          {value["on_auth"]["signin"] && <SigninOrUp signin />}
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
      </div>
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
