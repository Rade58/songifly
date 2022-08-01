/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const AuthLayout: FC<Props> = () => {
  return <section>Hello Auth Layout</section>;
};

export default AuthLayout;
