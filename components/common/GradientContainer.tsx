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
  variant: number;
  defaultGradient?: never;
}

const GradientContainer: FC<PropsOne | PropsTwo> = ({
  children,
  customGradient,
  defaultGradient,
  variant,
}) => {
  const { availableThemes, theme } = useThemeSwitcher();

  // console.log(theme);

  const useDarkGradients = availableThemes[1] === theme;

  let currentGradient =
    "bg-gradient-to-r from-base-100 via-base-200 via-base-100 to-base-200";

  const darkGradients = [
    "bg-gradient-to-b from-cyan-900 via-base-100 to-base-100",
    "bg-gradient-to-b from-emerald-900 via-base-100 to-base-100",
    "bg-gradient-to-b from-rose-900 via-base-100 to-base-100",
    "bg-gradient-to-b from-amber-900 via-base-100 to-base-100",
    "bg-gradient-to-b from-teal-900 via-base-100 to-base-100",
    "bg-gradient-to-b from-indigo-900 via-base-100 to-base-100",
    "bg-gradient-to-b from-slate-900 via-base-100 to-base-100",
  ];
  const lightGradients = [
    "bg-gradient-to-b from-cyan-200 via-base-100 via-base-200 to-base-100",
    "bg-gradient-to-b from-emerald-200 via-base-100 via-base-200 to-base-100",
    "bg-gradient-to-b from-rose-200 via-base-100 via-base-200 to-base-100",
    "bg-gradient-to-b from-amber-200 via-base-100 via-base-200 to-base-100",
    "bg-gradient-to-b from-teal-200 via-base-100 via-base-200 to-base-100",
    "bg-gradient-to-b from-indigo-200 via-base-100 via-base-200 to-base-100",
    "bg-gradient-to-b from-slate-200 via-base-100 via-base-200 to-base-100",
  ];
  if (customGradient && !defaultGradient) {
    if (useDarkGradients) {
      currentGradient = darkGradients[variant];
    } else {
      currentGradient = lightGradients[variant];
    }
  }

  return (
    <>
      <section
        className={`grad-cont relative block border-0 border-rose-400 h-screen ${currentGradient}`.trim()}
      >
        {children}
      </section>
      <style jsx>{
        /* css */ `
          .grad-cont {
            height: calc(100vh - 6rem);
          }
        `
      }</style>
    </>
  );
};

export default GradientContainer;
