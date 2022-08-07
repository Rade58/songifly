/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import { IoIosPlay, IoIosPause } from "react-icons/io";
import { BiShuffle, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { TbRepeat } from "react-icons/tb";

import ReactHowler from "react-howler";

interface Props {
  children?: ReactNode;
}

const Controls: FC<Props> = () => {
  return (
    <div className="music-controls flex mx-auto mb-2 border-0 border-rose-200 w-56 justify-between items-center">
      <button className="btn btn-ghost btn-sm btn-circle">
        <BiShuffle size={16} />
      </button>
      <button className="btn btn-ghost btn-sm btn-circle">
        <div className="-mt-0.5">
          <BiSkipPrevious size={34} />
        </div>
      </button>
      <button className="play-btn btn btn-circle btn-sm scale-110">
        {/* <div className="ml-0.5">
          <IoIosPlay size={22} />
        </div> */}
        <div className="">
          <IoIosPause size={22} />
        </div>
      </button>
      <button className="btn btn-ghost btn-sm btn-circle">
        <div className="-mt-0.5">
          <BiSkipNext size={34} />
        </div>
      </button>
      <button className="btn btn-ghost btn-sm btn-circle">
        <TbRepeat size={16} />
      </button>
    </div>
  );
};

export default Controls;
