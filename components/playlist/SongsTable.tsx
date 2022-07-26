/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import { useRouter } from "next/router";

// import moment from "moment";

import Image from "next/image";

import { IoIosPlay, IoIosPause } from "react-icons/io";

import { AiOutlineClockCircle } from "react-icons/ai";

import { CgLoadbarSound } from "react-icons/cg";

import type { Song } from "@prisma/client";

import { formatTime, formatDate } from "@/util/formatters";

import usePlayerActor from "@/hooks/xstate/actors/usePlayerActor";

interface Props {
  children?: ReactNode;
  songs: (Song & {
    artist: {
      name: string;
      id: number;
    };
  })[];
}

const SongsTable: FC<Props> = ({ songs }) => {
  const [
    {
      value,
      context: { isPlaying, activeSong },
    },
    dispatch,
  ] = usePlayerActor();

  const {
    query: { id: playlistId },
  } = useRouter();

  const activeSongPlaying = (songIndex: number) => {
    if (
      isPlaying &&
      activeSong &&
      typeof playlistId === "string" &&
      activeSong.playlistId === +playlistId &&
      activeSong.songIndex === songIndex
    ) {
      return true;
    }

    return false;
  };

  const activeSongSelected = (songIndex: number) => {
    if (
      activeSong &&
      typeof playlistId === "string" &&
      activeSong.playlistId === +playlistId &&
      activeSong.songIndex === songIndex
    ) {
      return true;
    }

    return false;
  };

  // console.log({ playlistId });

  return (
    <>
      <div className="relative">
        {/* {activeSong && */}
        <span className="absolute -top-16 -mt-3 left-12">
          <button
            onClick={() => {
              // console.log(value, songs);

              if (value === "no_song") {
                if (songs) {
                  dispatch({
                    type: "GIVE_ACTIVE_SONG",
                    payload: {
                      song: {
                        data: songs[0],
                        songIndex: 0,
                        playlistId: +(playlistId as string),
                      },
                    },
                  });
                }
              } else {
                dispatch({
                  type: "TOGGLE_PLAY",
                });
              }
            }}
            className="my-large-btn btn btn-circle btn-lg btn-success"
          >
            {!isPlaying ? (
              <div className="ml-1">
                <IoIosPlay size={42} />
              </div>
            ) : (
              <div className="">
                <IoIosPause size={42} />
              </div>
            )}
          </button>
        </span>
        {/*)}*/}
      </div>
      <div className="overflow-x-auto mx-12 mt-24">
        <table className="songs-table table-compact w-full">
          {/* <!-- head --> */}
          <thead className="border-b border-base-300">
            <tr>
              <th>
                <span className="ml-4">#</span>
                {/* <label>
                <input type="checkbox" className="checkbox" />
              </label> */}
              </th>
              <th>title</th>
              <th>album</th>
              <th>date added</th>
              <th>
                <span>
                  <AiOutlineClockCircle size={19} />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {songs.map((song, i) => {
              const {
                name,
                artist: { name: artist },
                duration,
                updatedAt,
              } = song;

              const songIsPlaying = activeSongPlaying(i);

              const songIsActive = activeSongSelected(i);

              return (
                <tr key={name} className={"song-row"}>
                  <td className="border-0 border-rose-200 w-14">
                    {/* <label>
                    <input type="checkbox" className="checkbox" />
                  </label> */}
                    <span className="num-of-song ml-4 flex items-center relative">
                      {!songIsPlaying ? (
                        <span
                          className={`${songIsActive ? "text-success" : ""}`}
                        >{`${i + 1}`}</span>
                      ) : (
                        <span className="relative -left-2 flex justify-center items-center text-success">
                          <CgLoadbarSound size={24} />
                        </span>
                      )}
                    </span>
                    <span className="play-icon hidden relative">
                      <button
                        className="relative left-1.5 btn btn-ghost btn-circle btn-sm"
                        onClick={() => {
                          if (songIsPlaying) {
                            dispatch({
                              type: "TOGGLE_PLAY",
                            });

                            return;
                          }

                          dispatch({
                            type: "GIVE_ACTIVE_SONG",
                            payload: {
                              song: {
                                data: song,
                                songIndex: i,
                                playlistId: +(playlistId as string),
                              },
                            },
                          });
                        }}
                      >
                        {!songIsPlaying ? (
                          <IoIosPlay size={19} />
                        ) : (
                          <IoIosPause size={19} />
                        )}
                      </button>
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-square w-9 h-9">
                          <Image
                            priority
                            layout="fill"
                            src="https://placeimg.com/192/192/people"
                            alt="song"
                          />
                        </div>
                      </div>
                      <div>
                        <div
                          className={`font-semibold ${
                            songIsActive ? "text-success" : ""
                          }`}
                        >
                          {name}
                        </div>
                        <div className="text-sm text-opacity-10 opacity-70">
                          {artist}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-opacity-40">
                    <span className="opacity-60">Tool lookalike</span>

                    {/* <br /> */}
                    {/* <span className="badge badge-ghost badge-sm">
                    Desktop Support 
                  </span> */}
                  </td>
                  <td className="font-normal text-opacity-40">
                    {/* <span className="opacity-60">
                      {moment(new Date(updatedAt)).startOf("day").fromNow()}
                    </span> */}
                    <span className="opacity-60">
                      {formatDate(new Date(updatedAt))}
                    </span>
                  </td>

                  <td className="font-normal text-opacity-40">
                    {/* <span className="opacity-60">3:66</span> */}
                    {/* <span className="opacity-60">
                      {(duration / 100).toString().replace(".", ":")}
                    </span> */}
                    <span className="opacity-60">{formatTime(duration)}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* <!-- foot --> */}
          {/* <tfoot>
            <tr>
              <th>
                #
               
              </th>
              <th>title</th>
              <th>album</th>
              <th>date added</th>
              <th>time icon</th>
            </tr>
          </tfoot> */}
        </table>
      </div>
      <style jsx>{/* css */ ``}</style>
    </>
  );
};

export default SongsTable;
