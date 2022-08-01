/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <section>
      Hello Auth Layout
      {children}
    </section>
  );
};

export default AuthLayout;
