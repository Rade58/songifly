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
  defaultColor: true;
  customColor?: never;
  variant?: never;
}

interface PropsTwo extends Props {
  customColor: true;
  variant: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  defaultColor?: never;
}

const ColorContainer: FC<PropsOne | PropsTwo> = ({
  children,
  defaultColor,
  customColor,
  variant,
}) => {
  const { availableThemes, theme } = useThemeSwitcher();

  // console.log(theme);

  const useDarkBg = availableThemes[1] === theme;

  // let currentGradient =
  // leftToRight + "from-base-100 via-base-200 via-base-100 to-base-200";
  let currentBg = "bg-base-300";

  const darkBgs = [
    "bg-cyan-900",
    "bg-emerald-900",
    "bg-rose-900",
    "bg-amber-900",
    "bg-teal-900",
    "bg-indigo-900",
    "bg-slate-900",
  ];
  const lightBgs = [
    "bg-cyan-300",
    "bg-emerald-300",
    "bg-rose-300",
    "bg-amber-300",
    "bg-teal-300",
    "bg-indigo-300",
    "bg-slate-300",
  ];
  if (customColor && !defaultColor) {
    if (useDarkBg) {
      currentBg = darkBgs[variant];
    } else {
      currentBg = lightBgs[variant];
    }
  }

  return (
    <section
      className={`block border-6 from- border-rose-400 h-16 w-full ${currentBg}`.trim()}
    >
      {children}
    </section>
  );
};

export default ColorContainer;
