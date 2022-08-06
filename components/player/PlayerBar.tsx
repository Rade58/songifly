/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";

interface Props {
  children?: ReactNode;
}

const PlayerBar: FC<Props> = () => {
  const { theme } = useThemeSwitcher();

  return (
    <section className="flex border border-rose-600 h-full w-full justify-evenly items-center">
      <div className="current-song flex mr-auto border border-teal-500">
        Song
      </div>
      <div className="player border border-teal-500 flex flex-col">Player</div>
      <div className="volume ml-auto border border-teal-500">Volume</div>
    </section>
  );
};

export default PlayerBar;
