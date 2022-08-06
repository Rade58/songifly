/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Player: FC<Props> = () => {
  return (
    <>
      <div className="btn-group">
        <button className="btn btn-active btn-xs">Button</button>
        <button className="btn btn-xs">Button</button>
        <button className="btn btn-xs">Button</button>
      </div>
      <div>
        <div>
          <input
            type="range"
            min="0"
            max="100"
            value="40"
            className="range range-xs"
          />
        </div>
        <div>
          <progress className="progress w-56" value="70" max="100"></progress>
        </div>
      </div>
    </>
  );
};

export default Player;
