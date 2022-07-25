/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Logo: FC<Props> = () => {
  return <div className="border border-teal-600 h-14">Logo</div>;
};

export default Logo;
