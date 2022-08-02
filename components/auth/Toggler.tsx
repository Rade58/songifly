/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import useAuthActor from "@/hooks/xstate/actors/useAuthActor";

interface Props {
  children?: ReactNode;
}

const Toggler: FC<Props> = () => {
  const [state] = useAuthActor();

  return (
    <div className="border border-rose-600 w-full flex justify-around">
      <h1 className="self-center justify-self-center mx-auto border border-zinc-600">
        Log In
      </h1>
      <span className="justify-self-end">
        or <button className="btn btn-link">Sign Up</button>
      </span>
    </div>
  );
};

export default Toggler;
