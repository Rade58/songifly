/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const PlayerLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <h1>Player Layout</h1>
      {children}
    </div>
  );
};

export default PlayerLayout;
