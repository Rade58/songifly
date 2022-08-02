/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import useAuthActor from "@/hooks/xstate/actors/useAuthActor";

interface Props {
  children?: ReactNode;
}

const Toggler: FC<Props> = () => {
  const [state, dispatch] = useAuthActor();

  // @ts-ignore
  const text = state.value["on_auth"]["signup"]
    ? "Create New Account"
    : "Sign In To Your Account";
  // @ts-ignore
  const otherText = state.value["on_auth"]["signin"] ? "Sign Up" : "Log In";

  return (
    <div className="border-0 border-rose-600 w-full flex justify-around mb-8 mt-16">
      <h1 className="self-center justify-self-center ml-auto mr-auto border-0 border-zinc-600 text-xl">
        {text}
      </h1>
      <span className="justify-self-end">
        or{" "}
        <button
          className="btn btn-link"
          onClick={() => {
            dispatch("AUTH_MODE_TOGGLE");
          }}
        >
          {otherText}
        </button>
      </span>
    </div>
  );
};

export default Toggler;
