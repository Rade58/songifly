/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const GradientLayout: FC<Props> = ({ children }) => {
  return (
    <section className="block border-1 border-rose-100">{children}</section>
  );
};

export default GradientLayout;
