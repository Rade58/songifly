/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";
// import useThemeSwitcher from "@/hooks/useThemeSwitcher";

import usePlayerActor from "@/hooks/xstate/actors/usePlayerActor";

import CurrentSong from "./CurrentSong";
import Player from "./Player";
import Volume from "./Volume";

interface Props {
  children?: ReactNode;
}

const PlayerBar: FC<Props> = () => {
  // const { theme } = useThemeSwitcher();

  const [
    {
      context: { activeSong },
    },
  ] = usePlayerActor();

  return (
    <>
      <section className="flex border-0 border-rose-600 h-full w-full justify-evenly items-center">
        {activeSong && (
          <div className="current-song flex items-center mr-auto border-0 border-teal-500 w-2/12">
            <CurrentSong />
          </div>
        )}
        <div className="player border-0 border-teal-500 flex flex-col w-5/12">
          <Player />
        </div>

        {activeSong && (
          <div className="volume ml-auto border-0 border-teal-500 w-2/12">
            <Volume />
          </div>
        )}
      </section>
    </>
  );
};

export default PlayerBar;
