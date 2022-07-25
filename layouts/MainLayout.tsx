/* eslint jsx-a11y/anchor-is-valid: 1 */

// THIS IS A NOOP (USED JUST FOR PURPOSE OF
// CHECKING OUT LAYOUT FEATURE OF NEXTJS)

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
