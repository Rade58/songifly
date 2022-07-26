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
  const [songEnded, setSongEnded] = useState<number>(0);

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
        seekValue: howlerSeekValue,

        isPlaying,
        activeSong,
        repeat,
        shuffle,
        songs,
        volume,
      },
    },
    dispatch,
  ] = usePlayerActor();

  // const [howlerSeekValue, setHowlerSeekValue] = useState<number>(0);
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
    // setHowlerSeekValue(seekVal);
    dispatch({
      type: "GIVE_SEEK_VAL",
      payload: {
        seekValue: seekVal,
      },
    });

    if (howlerPlayerRef.current) {
      howlerPlayerRef.current.seek(seekVal);
    }

    setUseHowlerSeekValue(true);
  };

  const allIDoIsShuffling = () => {
    if (songs && activeSong) {
      const length = songs.tracks.length - 1;

      let randomIndex = Math.round(Math.random() * length);

      do {
        randomIndex = Math.round(Math.random() * length);
      } while (randomIndex === activeSong.songIndex);

      dispatch({
        type: "GIVE_ACTIVE_SONG",
        payload: {
          song: {
            data: songs.tracks[randomIndex],
            songIndex: randomIndex,
            playlistId: songs.playlistId,
          },
        },
      });

      return;
    }

    if (songs && !activeSong) {
      const randomIndex = Math.round(Math.random() * length);
      dispatch({
        type: "GIVE_ACTIVE_SONG",
        payload: {
          song: {
            data: songs.tracks[randomIndex],
            songIndex: randomIndex,
            playlistId: songs.playlistId,
          },
        },
      });
    }
  };

  const handleEnd = (param: number) => {
    setSongEnded((prev) => prev + 1);
  };

  useEffect(() => {
    if (songEnded === 0) return;
    if (!dispatch) return;

    if (repeat && activeSong) {
      if (howlerPlayerRef.current) {
        // howlerPlayerRef.current.seek(0);

        dispatch({
          type: "GIVE_SEEK_VAL",
          payload: {
            seekValue: 0,
          },
        });
        howlerPlayerRef.current.seek(0);

        // setHowlerSeekValue(0);
        // setSeekVal(0);
      }

      dispatch({
        type: "GIVE_ACTIVE_SONG",
        payload: {
          song: activeSong,
        },
      });

      return;
    }

    if (shuffle) {
      allIDoIsShuffling();
      return;
    }

    dispatch({
      type: "SKIP_RIGHT",
    });
  }, [songEnded]);

  // console.log({ repeat });

  const [duration, setDuration] = useState(0);

  // console.log({ volume });

  return (
    <div className="relative flex w-full border-0 border-rose-600 justify-between items-center">
      {activeSong && activeSong.data && activeSong.data.url && (
        <Howller
          volume={volume}
          onLoad={(p) => {
            if (howlerPlayerRef.current) {
              // console.log(howlerPlayerRef.current.duration());

              // if()

              setDuration(howlerPlayerRef.current.duration());
            }
          }}
          ref={(player) => {
            if (!howlerPlayerRef.current) {
              howlerPlayerRef.current = player;
            }

            if (isPlaying && timerIdRef.current === undefined) {
              timerIdRef.current = setInterval(() => {
                if (player) {
                  // setHowlerSeekValue(Math.round(player.seek()));
                  dispatch({
                    type: "GIVE_SEEK_VAL",
                    payload: {
                      seekValue: Math.round(player.seek()),
                    },
                  });
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
                max={duration}
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
                max={duration}
              ></progress>
            </div>
          </div>
          <div className="text-sm font-light opacity-75">
            {formatTime(duration)}
          </div>
        </>
      )}
    </div>
  );
};

export default SeekBar;
