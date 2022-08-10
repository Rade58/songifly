/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, { ChangeEvent, createRef, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";

import { TiVolumeUp, TiVolumeMute } from "react-icons/ti";

import usePlayerActor from "@/hooks/xstate/actors/usePlayerActor";

interface Props {
  children?: ReactNode;
}

const Volume: FC<Props> = () => {
  const [
    {
      context: { mute, volume },
    },
    dispatch,
  ] = usePlayerActor();

  const [prevVol, setPrevVol] = useState(0);

  return (
    <div className="ml-auto mr-4 flex w-3/4 items-center">
      <button
        onClick={() => {
          if (mute) {
            dispatch({
              type: "GIVE_VOLUME",
              payload: {
                volume: prevVol,
              },
            });
          } else {
            dispatch({
              type: "GIVE_VOLUME",
              payload: {
                volume: 0,
              },
            });
          }
          setPrevVol(volume);
        }}
        className="volume-btn cursor-default btn btn-xs btn-ghost hover:bg-transparent"
      >
        {!mute ? <TiVolumeUp size={20} /> : <TiVolumeMute size={20} />}
      </button>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          // console.log(e.target.value);
          // console.log(+e.target.value / 10);

          dispatch({
            type: "GIVE_VOLUME",
            payload: {
              volume: +e.target.value / 10,
            },
          });
        }}
        type="range"
        min="0"
        max="10"
        value={volume * 10}
        className="range range-secondary range-xs cursor-default"
        // defaultValue="5"
      />
    </div>
  );
};

export default Volume;
