/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, { ChangeEvent, createRef, useEffect } from "react";
import type { FC, ReactNode } from "react";

import { TiVolumeUp, TiVolumeMute } from "react-icons/ti";

import usePlayerActor from "@/hooks/xstate/actors/usePlayerActor";

interface Props {
  children?: ReactNode;
}

const Volume: FC<Props> = () => {
  const [
    {
      context: { mute },
    },
    dispatch,
  ] = usePlayerActor();

  const sliderRef = createRef<HTMLInputElement>();

  /* useEffect(() => {
    //
    //
    if (sliderRef.current) {
      sliderRef.current.value = "2";
    }
  }, [sliderRef]);
 */
  return (
    <div className="ml-auto mr-4 flex w-3/4 items-center">
      <button
        onClick={() => {
          if (mute) {
            dispatch({
              type: "VOLUME_TO_HALF",
            });
            if (sliderRef.current) {
              sliderRef.current.value = "5";
            }
          } else {
            dispatch({
              type: "MUTE",
            });

            if (sliderRef.current) {
              sliderRef.current.value = "0";
            }
          }
        }}
        className="volume-btn cursor-default btn btn-xs btn-ghost hover:bg-transparent"
      >
        {!mute ? <TiVolumeUp size={20} /> : <TiVolumeMute size={20} />}
      </button>
      <input
        ref={sliderRef}
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
        // value="50"
        className="range range-secondary range-xs cursor-default"
        defaultValue="5"
      />
    </div>
  );
};

export default Volume;
