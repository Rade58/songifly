/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const CurrentSong: FC<Props> = () => {
  return (
    <>
      <div>Image</div>
      <div>
        <div>Song Name</div>
        <div>Artist Name</div>
      </div>
    </>
  );
};

export default CurrentSong;
