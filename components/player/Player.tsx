/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Player: FC<Props> = () => {
  return (
    <>
      <div className="btn-group mx-auto mb-2">
        <button className="btn btn-active btn-xs">Button</button>
        <button className="btn btn-xs">Button</button>
        <button className="btn btn-xs">Button</button>
      </div>
      <div className="relative flex w-full border border-rose-600 justify-between items-center">
        <div>1:24</div>
        <div className="player-progress-cont flex flex-col border border-rose-600 w-10/12">
          <div className="hidden input-range-cont">
            <input
              type="range"
              min={0}
              max={100}
              // value={40}
              className="range range-xs"
            />
          </div>
          <div className="progress-cont flex">
            <progress
              className="progress progress-xs w-full"
              value="70"
              max="100"
            ></progress>
          </div>
        </div>
        <div>2:24</div>
      </div>
    </>
  );
};

export default Player;
