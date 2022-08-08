/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, { useState, createRef, useRef, useEffect } from "react";
import type { FC, ReactNode, ChangeEvent } from "react";
import Howller from "react-howler";

import { formatTime } from "@/util/formatters";

import usePlayerActor from "@/hooks/xstate/actors/usePlayerActor";

interface Props {
  children?: ReactNode;
}

const SeekBar: FC<Props> = () => {
  // REFERENCE FOR THE TIMER ID
  const timerId = useRef<NodeJS.Timer | undefined>();

  useEffect(() => {
    return () => {
      if (timerId.current !== undefined) {
        clearInterval(timerId.current);
      }
    };
  }, [timerId]);

  const [
    {
      context: {
        seekValue: howlerSeekValue,

        isPlaying,
        activeSong,
      },
    },
    dispatch,
  ] = usePlayerActor();

  // -- HOWLER VALUE (TODO) (THIS IS JUST TEMPORARRY)]
  // -- TODO- WE ARE GOING TO BRING THIS HERE FROM THE MACHINE
  // const howlerSeekValue = 20;
  // ------------------------------------------------
  // ------------------------------------------------

  // FOR CONTROLED RANGE INPUT
  const [seekVal, setSeekVal] = useState<number>(0);

  // TO DETERMINE IF WE ARE GOING TO
  // FEED INPUT WITH HOWLER SEEK VALUUE OR LOCAL STATE VALUE
  const [useHowlerSeekValue, setUseHowlerSeekValue] = useState(true);

  // INTENDED FOR THE HOWLER (ONLY TIME IT IS GOING TO CHANGE
  // IS ON mouseup EVENT OF TH RANGE INPUT (WE DON'T WANT
  // TO CHANGE HOWLER VALUE onchange BECAUSE YOU WOULD
  // HAVE TOO MUCH ANOYING RERENDERING AS YOU SLIDE
  // RANGE ELEMENT))
  // const [seekValueForHowler, setSeekValueForHowler] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSeekVal(+e.target.value);
  };

  const handleMouseDown = () => {
    setUseHowlerSeekValue(false);
  };

  const handleMouseUp = () => {
    // todo: set seek to the howler player
    // you need reference for the howler player
    // WE NEED TO ASSIGN      seekVal     VALUE TO THE
    //                                    HOWLER PLAYER
    //                                    IN HERE
    //
    //
    setUseHowlerSeekValue(true);
  };

  // BUT ALSO A HOWLER SHOULD CHANGE THE PROGRESS AND A RANGE
  // BUT WE NEED TO STOP FEEDING THAT STATE TO OUR RANGE AND PROGRE
  // WHEN WE CLICK ON THE RANGE

  return (
    <div className="relative flex w-full border-0 border-rose-600 justify-between items-center">
      {activeSong && (
        <Howller
          ref={(player) => {
            // SETTING SEEK
            // player?.seek()
            // GETTING SEEK
            // player.seek

            if (isPlaying && timerId.current !== undefined) {
              timerId.current = setInterval(() => {
                if (player) {
                  console.log({ SEEK: player.seek() });

                  dispatch({
                    type: "GIVE_SEEK_VAL",
                    payload: {
                      seekValue: player.seek(),
                    },
                  });
                }
              }, 2000);
            } else {
              if (timerId.current !== undefined) {
                clearInterval(timerId.current);
                timerId.current = undefined;
              }
            }
          }}
          playing={isPlaying}
          src={
            // "https://dl.dropboxusercontent.com/s/7xmpwvvek6szx5n/fermi-paradox.mp3?dl=0"
            activeSong.data.url
          }
          /* onSeek={(howlerSeekValue) => {
            console.log({ howlerSeekValue });

            dispatch({
              type: "GIVE_SEEK_VAL",
              payload: {
                seekValue: howlerSeekValue,
              },
            });
          }} */
        />
      )}
      <div className="text-sm font-light opacity-75">
        {formatTime(howlerSeekValue)}
      </div>
      <div className="player-progress-cont flex h-6 justify-center flex-col border-0 border-rose-600 w-10/12">
        <div className="hidden input-range-cont">
          <input
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onChange={handleChange}
            type="range"
            min={0}
            max={activeSong?.data.duration}
            //
            value={!useHowlerSeekValue ? seekVal : howlerSeekValue}
            //
            className="range range-xs range-secondary"
          />
        </div>
        <div className="progress-cont flex">
          <progress
            className="progress progress-secondary progress-xs w-full"
            //
            value={!useHowlerSeekValue ? seekVal : howlerSeekValue}
            //
            max={activeSong?.data.duration}
          ></progress>
        </div>
      </div>
      <div className="text-sm font-light opacity-75">
        {formatTime(activeSong?.data.duration)}
      </div>
    </div>
  );
};

export default SeekBar;
