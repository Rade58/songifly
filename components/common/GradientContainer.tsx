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
  gradientVariant?: never;
}

interface PropsTwo extends Props {
  gradientVariant: 0 | 1 | 2 | 3 | 4;
  defaultGradient?: never;
}

const buildGradient = (color: string) => {
  //

  return;
};

const GradientContainer: FC<PropsOne | PropsTwo> = ({
  children,
  gradientVariant,
  defaultGradient,
}) => {
  const { availableThemes, theme } = useThemeSwitcher();

  const useDarkGradients = availableThemes[1] === theme;

  const [currentGradient, setCurrentGradient] = useState<string>(
    "from-base-300 to-base-100"
  );

  useEffect(() => {
    const darkGradients = ["from-base-300 to-cyan-300"];

    const lightGradients = ["from-base-300 to-cyan-100"];
    if (useDarkGradients) {
      console.log({ useDarkGradients });

      console.log(darkGradients[gradientVariant]);

      setCurrentGradient(darkGradients[gradientVariant]);
    } else {
      setCurrentGradient(lightGradients[gradientVariant]);
    }
  }, [useDarkGradients, gradientVariant, setCurrentGradient]);

  // console.log({ currentGradient, gradientVariant, useDarkGradients });

  return (
    <section
      className={`block border-6 border-rose-400 h-screen bg-gradient-to-b ${currentGradient}`}
    >
      {children}
    </section>
  );
};

export default GradientContainer;
