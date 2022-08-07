/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import { TiVolumeUp } from "react-icons/ti";

interface Props {
  children?: ReactNode;
}

const Volume: FC<Props> = () => {
  return (
    <div className="ml-auto mr-4 flex w-3/4 items-center">
      <button className="volume-btn cursor-default btn btn-xs btn-ghost hover:bg-transparent">
        <TiVolumeUp size={20} />
      </button>
      <input
        type="range"
        min="0"
        max="100"
        // value="50"
        className="range range-secondary range-xs cursor-default"
      />
    </div>
  );
};

export default Volume;
