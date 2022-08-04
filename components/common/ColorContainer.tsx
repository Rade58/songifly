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
  variant: number;
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
    "bg-cyan-100",
    "bg-emerald-100",
    "bg-rose-100",
    "bg-amber-100",
    "bg-teal-100",
    "bg-indigo-100",
    "bg-slate-100",
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
            priority
            layout="fill"
            src="https://placeimg.com/192/192/people"
            alt="avatar"
          />
        </div>
      </div>
      <div className="self-end ml-6 border-0 border-rose-500 flex flex-col items-stretch justify-evenly">
        <p className="text-xs font-bolder">{mode.toUpperCase()}</p>
        <h1 className="text-7xl font-extrabold">{title}</h1>
        <p className="text-sm mt-6">{someData}</p>
        {moreData && <p className="text-xs">{moreData}</p>}
      </div>

      {children}
    </section>
  );
};

export default ColorContainer;
