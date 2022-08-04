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
  color?: never;
}

interface PropsTwo extends Props {
  customGradient: true;
  color?: string;
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
  color,
}) => {
  const leftToRight = "bg-gradient-to-r ";
  const topToBottom = "bg-gradient-to-b ";

  const { availableThemes, theme } = useThemeSwitcher();

  const useDarkGradients = availableThemes[1] === theme;

  let currentGradient =
    leftToRight + "from-base-100 via-base-200 via-base-100 to-base-200";

  const darkGradient = `from-${
    color ? `${color}-800` : "base-300"
  } via-base-200 to-base-100`;
  const lightGradient = `from-${
    color ? `${color}-100` : "base-100"
  } via-base-200 to-base-100`;

  if (customGradient && !defaultGradient) {
    if (useDarkGradients) {
      currentGradient = topToBottom + darkGradient;
    } else {
      currentGradient = topToBottom + lightGradient;
    }
  }

  console.log({ currentGradient });

  return (
    <section
      className={`block border-6 border-rose-400 h-screen ${currentGradient}`.trim()}
    >
      {children}
    </section>
  );
};

export default GradientContainer;
