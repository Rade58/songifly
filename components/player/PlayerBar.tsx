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
      <div className="flex mr-auto">Song</div>
      <div className="player flex">Player</div>
      <div className="volume ml-auto">Volume</div>
    </section>
  );
};

export default PlayerBar;
