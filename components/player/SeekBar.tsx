/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, {
  useState,
  createRef,
  useRef,
  useEffect,
  useCallback,
} from "react";
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

  const [
    {
      context: {
        // seekValue: howlerSeekValue,

        isPlaying,
        activeSong,
        repeat,
        shuffle,
      },
    },
    dispatch,
  ] = usePlayerActor();

  const [howlerSeekValue, setHowlerSeekValue] = useState<number>(0);
  // ------------------------------------------------
  // ------------------------------------------------

  const [seekVal, setSeekVal] = useState<number>(0);

  const [useHowlerSeekValue, setUseHowlerSeekValue] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSeekVal(Math.round(+e.target.value));
  };

  const handleMouseDown = () => {
    setUseHowlerSeekValue(false);
  };
  //
  const handleMouseUp = () => {
    setHowlerSeekValue(seekVal);

    if (howlerPlayerRef.current) {
      howlerPlayerRef.current.seek(seekVal);
    }

    setUseHowlerSeekValue(true);
  };

  const handleEnd = useCallback(
    (param: number) => {
      // console.log("---------");
      // console.log({ repeat });
      // console.log("ENDED!!!!");

      if (!repeat) {
        //
        dispatch({
          type: "SKIP_RIGHT",
        });

        // return;
      }

      if (repeat && activeSong) {
        dispatch({
          type: "GIVE_ACTIVE_SONG",
          payload: {
            song: activeSong,
          },
        });
      }
    },
    [repeat, shuffle, activeSong]
  );

  console.log({ repeat });

  return (
    <div className="relative flex w-full border-0 border-rose-600 justify-between items-center">
      {activeSong && activeSong.data && activeSong.data.url && (
        <>
          {repeat ? (
            <Howller
              ref={(player) => {
                if (!howlerPlayerRef.current) {
                  howlerPlayerRef.current = player;
                }

                if (isPlaying && timerIdRef.current === undefined) {
                  timerIdRef.current = setInterval(() => {
                    if (player) {
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
              src={activeSong?.data.url || ""}
              onEnd={handleEnd}
            />
          ) : (
            <Howller
              ref={(player) => {
                if (!howlerPlayerRef.current) {
                  howlerPlayerRef.current = player;
                }

                if (isPlaying && timerIdRef.current === undefined) {
                  timerIdRef.current = setInterval(() => {
                    if (player) {
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
              src={activeSong?.data.url || ""}
              onEnd={handleEnd}
            />
          )}
        </>
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
