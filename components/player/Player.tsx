/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";
import { IoIosPlay } from "react-icons/io";
import { BiShuffle, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { TbRepeat } from "react-icons/tb";

import ReactHowler from "react-howler";

interface Props {
  children?: ReactNode;
}

const Player: FC<Props> = () => {
  return (
    <>
      <div className="music-controls flex mx-auto mb-2 border-0 border-rose-200 w-56 justify-between items-center">
        <button className="btn btn-ghost btn-sm btn-circle">
          <BiShuffle size={16} />
        </button>
        <button className="btn btn-ghost btn-sm btn-circle">
          <BiSkipPrevious size={34} />
        </button>
        <button className="play-btn btn btn-circle btn-sm scale-110">
          <IoIosPlay size={22} />
        </button>
        <button className="btn btn-ghost btn-sm btn-circle">
          <BiSkipNext size={34} />
        </button>
        <button className="btn btn-ghost btn-sm btn-circle">
          <TbRepeat size={16} />
        </button>
      </div>
      <div className="relative flex w-full border-0 border-rose-600 justify-between items-center">
        <div className="text-sm font-light opacity-75">1:24</div>
        <div className="player-progress-cont flex h-6 justify-center flex-col border-0 border-rose-600 w-10/12">
          <div className="hidden input-range-cont">
            <input
              type="range"
              min={0}
              max={100}
              // value={40}
              className="range range-xs range-secondary"
            />
          </div>
          <div className="progress-cont flex">
            <progress
              className="progress progress-secondary progress-xs w-full"
              value="70"
              max="100"
            ></progress>
          </div>
        </div>
        <div className="text-sm font-light opacity-75">2:24</div>
      </div>
    </>
  );
};

export default Player;
