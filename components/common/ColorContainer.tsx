/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, { useState, useEffect } from "react";
import type { FC, ReactNode } from "react";

import Image from "next/image";

import useThemeSwitcher from "@/hooks/useThemeSwitcher";

interface Props {
  children?: ReactNode;
  // title: string;
  // description: string;
  // imageUrl: string;
  mode: "profile" | "playlist";
  title: string;
  someData: string;
  moreData?: string;
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
  mode,
  title,
  someData,
  moreData,
}) => {
  const { availableThemes, theme } = useThemeSwitcher();

  // console.log(theme);

  const useDarkBg = availableThemes[1] === theme;

  // let currentGradient =
  // leftToRight + "from-base-100 via-base-200 via-base-100 to-base-200";
  let currentBg = "bg-base-200";

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
      className={`flex pt-12 pb-5 pl-9 shadow-xs shadow-base-300 border-rose-400 w-full ${currentBg}`.trim()}
    >
      <div className="avatar">
        <div
          className={`w-44 ${
            mode === "playlist"
              ? "rounded"
              : mode === "profile"
              ? "rounded-full"
              : ""
          }  relative`}
        >
          {/* <img src="https://placeimg.com/192/192/people" /> */}
          <Image
            layout="fill"
            src="https://placeimg.com/192/192/people"
            alt="avatar"
          />
        </div>
      </div>
      <div className="border border-rose-500"></div>

      {children}
    </section>
  );
};

export default ColorContainer;
