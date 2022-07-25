/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Sidebar: FC<Props> = () => {
  return <div>Hello Sidebar</div>;
};

export default Sidebar;
