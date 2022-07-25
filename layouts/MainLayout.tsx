/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import Navigation from "@/components/Navigation";

interface Props {
  children?: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default MainLayout;
