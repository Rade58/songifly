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
  const [
    {
      value,
      context: { networkError, isLoading },
    },
  ] = useAuthActor();

  // console.log({ value });

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
          {networkError && (
            <div className="alert alert-error shadow-lg w-80 mt-12">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{networkError}</span>
              </div>
            </div>
          )}
          {isLoading && <progress className="mt-12 progress w-56"></progress>}
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
              border: crimson solid 0px;
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
