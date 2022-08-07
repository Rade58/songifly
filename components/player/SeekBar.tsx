/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, { useState } from "react";
import type { FC, ReactNode, ChangeEvent } from "react";

import ReactHowler from "react-howler";

interface Props {
  children?: ReactNode;
}

const SeekBar: FC<Props> = () => {
  const [seekVal, setSeekVal] = useState(50);
  // const [seekPressed, setseekPresed] = useState(false);
  const [seekValueForHowler, setSeekValueForHowler] = useState(50);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("seek called");

    setSeekVal(+e.target.value);
  };

  const handleMouseUp = () => {
    setSeekValueForHowler(seekVal);
  };

  /* const handleMouseDown = () => {
    setseekPresed(true);
  }; */

  return (
    <div className="relative flex w-full border-0 border-rose-600 justify-between items-center">
      <div className="text-sm font-light opacity-75">1:24</div>
      <div className="player-progress-cont flex h-6 justify-center flex-col border-0 border-rose-600 w-10/12">
        <div className="hidden input-range-cont">
          <input
            onMouseUp={handleMouseUp}
            onChange={handleChange}
            type="range"
            min={0}
            max={100}
            value={seekVal}
            className="range range-xs range-secondary"
          />
        </div>
        <div className="progress-cont flex">
          <progress
            className="progress progress-secondary progress-xs w-full"
            value={seekValueForHowler}
            max="100"
          ></progress>
        </div>
      </div>
      <div className="text-sm font-light opacity-75">{seekValueForHowler}</div>
    </div>
  );
};

export default SeekBar;
