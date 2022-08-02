/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface PrOne extends Props {
  signin: true;
  signup?: false;
}

interface PrTwo extends Props {
  signup: true;
  signin?: false;
}

const SignInOrUpForm: FC<PrOne | PrTwo> = ({}) => {
  return <form></form>;
};

export default SignInOrUpForm;
