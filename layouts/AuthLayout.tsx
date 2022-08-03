/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

import AuthForm from "@/components/auth/AuthForm";

// DON'T FORGET TO PASS CHILDREN
// IF YOU DON'T, YOUR PAGE WON'T BE RENDERED, JUST LAYOUT
const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <section className="block border-1 border-rose-100">
      {/* Hello Auth Layout */}
      {children}
      <AuthForm />
    </section>
  );
};

export default AuthLayout;
