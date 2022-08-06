/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import Image from "next/image";

interface Props {
  children?: ReactNode;
}

const CurrentSong: FC<Props> = () => {
  return (
    <>
      <div className="avatar ml-4 mr-4">
        <div className="mask mask-square w-14 h-14">
          <Image
            priority
            layout="fill"
            src="https://placeimg.com/192/192/people"
            alt="song"
          />
        </div>
      </div>
      <div>
        <div className="text-sm">Song Name</div>
        <div className="current-artist opacity-60 mt-1">Artist Name</div>
      </div>
    </>
  );
};

export default CurrentSong;
