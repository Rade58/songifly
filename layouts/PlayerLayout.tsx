/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const PlayerLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <main className="container border-8 border-teal-50">
        <div className="border border-teal-300 m-16">Hello World</div>
        Player Layout
        {children}
      </main>
    </>
  );
};

export default PlayerLayout;
