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
    <div className="border-0 border-rose-600 w-full flex justify-around mb-8">
      <h1 className="self-center justify-self-center ml-auto mr-auto border-0 border-zinc-600 text-xl">
        Log In
      </h1>
      <span className="justify-self-end">
        or <button className="btn btn-link">Sign Up</button>
      </span>
    </div>
  );
};

export default Toggler;
