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
    <div>
      <button className="btn btn-link">Log In</button> /{" "}
      <button className="btn btn-link">Sign Up</button>
    </div>
  );
};

export default Toggler;
