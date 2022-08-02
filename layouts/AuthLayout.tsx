/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

// import AuthForm from "@/components/auth/AuthForm";

// DON'T FORGET TO PASS CHILDREN
// IF YOU DON'T, YOUR PAGE WON'T BE RENDERED, JUST LAYOUT
const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <section>
      Hello Auth Layout
      {/* <AuthForm /> */}
      {children}
    </section>
  );
};

export default AuthLayout;
