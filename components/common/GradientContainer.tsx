/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, { useState, useEffect } from "react";
import type { FC, ReactNode } from "react";

import useThemeSwitcher from "@/hooks/useThemeSwitcher";

interface Props {
  children?: ReactNode;
  // title: string;
  // description: string;
  // imageUrl: string;
}

interface PropsOne extends Props {
  defaultGradient: true;
  customGradient?: never;
  variant?: never;
}

interface PropsTwo extends Props {
  customGradient: true;
  variant: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  defaultGradient?: never;
}

const buildGradient = (color: string) => {
  //

  return;
};

const GradientContainer: FC<PropsOne | PropsTwo> = ({
  children,
  customGradient,
  defaultGradient,
  variant,
}) => {
  const { availableThemes, theme } = useThemeSwitcher();

  console.log(theme);

  const useDarkGradients = availableThemes[1] === theme;

  // let currentGradient =
  // leftToRight + "from-base-100 via-base-200 via-base-100 to-base-200";
  let currentGradient =
    "bg-gradient-to-r from-base-100 via-cyan-200 via-base-100 to-base-200";

  const darkGradients = [
    "bg-gradient-to-b from-cyan-900 via-base-200 via-base-100 to-base-200",
    "bg-gradient-to-b from-emerald-900 via-base-200 via-base-100 to-base-200",
    "bg-gradient-to-b from-rose-900 via-base-200 via-base-100 to-base-200",
    "bg-gradient-to-b from-amber-900 via-base-200 via-base-100 to-base-200",
    "bg-gradient-to-b from-teal-900 via-base-200 via-base-100 to-base-200",
    "bg-gradient-to-b from-indigo-900 via-base-200 via-base-100 to-base-200",
    "bg-gradient-to-b from-slate-900 via-base-200 via-base-100 to-base-200",
  ];
  const lightGradients = [
    "bg-gradient-to-b from-cyan-300 via-base-200 via-base-100 to-base-200",
    "bg-gradient-to-b from-emerald-300 via-base-200 via-base-100 to-base-200",
    "bg-gradient-to-b from-rose-300 via-base-200 via-base-100 to-base-200",
    "bg-gradient-to-b from-amber-300 via-base-200 via-base-100 to-base-200",
    "bg-gradient-to-b from-teal-300 via-base-200 via-base-100 to-base-200",
    "bg-gradient-to-b from-indigo-300 via-base-200 via-base-100 to-base-200",
    "bg-gradient-to-b from-slate-300 via-base-200 via-base-100 to-base-200",
  ];
  if (customGradient && !defaultGradient) {
    if (useDarkGradients) {
      currentGradient = darkGradients[variant];
    } else {
      currentGradient = lightGradients[variant];
    }
  }

  console.log({ currentGradient });

  return (
    <section
      className={`block border-6 from- border-rose-400 h-screen ${currentGradient}`.trim()}
    >
      {children}
    </section>
  );
};

export default GradientContainer;
