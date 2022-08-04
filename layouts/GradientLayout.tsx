/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";

interface Props {
  children?: ReactNode;
  gradientVariant: 1 | 2 | 3 | 4 | 5;

  // title: string;
  // description: string;
  // imageUrl: string;
}

const buildGradient = (color: string) => {
  //

  return;
};

const GradientLayout: FC<Props> = ({ children, gradientVariant }) => {
  const variant1 = "";

  const { availableThemes, theme } = useThemeSwitcher();

  const useDarkGradients = availableThemes[1] === theme;

  console.log({ useDarkGradients });

  return (
    <section className="block border border-rose-400 h-screen bg-gradient-to-r from-base-300 to-cyan-100">
      Gradient Layout
      {children}
    </section>
  );
};

export default GradientLayout;
