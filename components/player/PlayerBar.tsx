/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";

import CurrentSong from "./CurrentSong";
import Player from "./Player";

interface Props {
  children?: ReactNode;
}

const PlayerBar: FC<Props> = () => {
  const { theme } = useThemeSwitcher();

  return (
    <section className="flex border-0 border-rose-600 h-full w-full justify-evenly items-center">
      <div className="current-song flex items-center mr-auto border-0 border-teal-500 w-2/12">
        <CurrentSong />
      </div>
      <div className="player border-0 border-teal-500 flex flex-col w-5/12">
        <Player />
      </div>
      <div className="volume ml-auto border border-teal-500 w-2/12">Volume</div>
    </section>
  );
};

export default PlayerBar;
