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
  const timerIdRef = useRef<NodeJS.Timer | undefined>();

  // HOWLER PLAYER REF
  const howlerPlayerRef = useRef<Howller | null>(null);

  useEffect(() => {
    return () => {
      if (timerIdRef.current !== undefined) {
        clearInterval(timerIdRef.current);
      }
    };
  }, [timerIdRef]);

  // WE NEED TO ELIMINATE SEEK VALUES THAT COME FROM MACHINE
  // BECAUSE THEY MAKE UNECESSARY RERENDERING OF BUNCH OF
  // COMPONENTS THAT USES THE ACTOR
  const [
    {
      context: {
        // seekValue: howlerSeekValue,

        isPlaying,
        activeSong,
      },
    },
    dispatch,
  ] = usePlayerActor();

  // -- HOWLER VALUE (TODO)
  const [howlerSeekValue, setHowlerSeekValue] = useState<number>(0);
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
    setSeekVal(Math.round(+e.target.value));
  };

  const handleMouseDown = () => {
    setUseHowlerSeekValue(false);
  };

  const handleMouseUp = () => {
    // WE NEED TO ASSIGN      seekVal     VALUE TO THE
    //                                    HOWLER PLAYER
    //                                    IN HERE
    //
    /* dispatch({
      type: "GIVE_SEEK_VAL",
      payload: {
        seekValue: seekVal,
      },
    });
    */

    setHowlerSeekValue(seekVal);

    if (howlerPlayerRef.current) {
      howlerPlayerRef.current.seek(seekVal);
    }

    //
    setUseHowlerSeekValue(true);
  };

  // BUT ALSO A HOWLER SHOULD CHANGE THE PROGRESS AND A RANGE
  // BUT WE NEED TO STOP FEEDING THAT STATE TO OUR RANGE AND PROGRE
  // WHEN WE CLICK ON THE RANGE

  return (
    <div className="relative flex w-full border-0 border-rose-600 justify-between items-center">
      {activeSong && activeSong.data && activeSong.data.url && (
        <Howller
          ref={(player) => {
            // SETTING SEEK
            // player?.seek()
            // GETTING SEEK
            // player.seek
            if (!howlerPlayerRef.current) {
              howlerPlayerRef.current = player;
            }

            if (isPlaying && timerIdRef.current === undefined) {
              timerIdRef.current = setInterval(() => {
                if (player) {
                  // console.log({ SEEK: player.seek() });

                  /* dispatch({
                    type: "GIVE_SEEK_VAL",
                    payload: {
                      seekValue: Math.round(player.seek()),
                    },
                  }); */

                  setHowlerSeekValue(Math.round(player.seek()));
                }
              }, 1000);
            } else {
              if (timerIdRef.current !== undefined) {
                clearInterval(timerIdRef.current);
                timerIdRef.current = undefined;
              }
            }
          }}
          playing={isPlaying}
          src={
            // "https://dl.dropboxusercontent.com/s/7xmpwvvek6szx5n/fermi-paradox.mp3?dl=0"
            activeSong?.data.url || ""
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
          onEnd={() => {
            dispatch({
              type: "SKIP_RIGHT",
            });
          }}
        />
      )}
      {activeSong && (
        <>
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
        </>
      )}
    </div>
  );
};

export default SeekBar;
