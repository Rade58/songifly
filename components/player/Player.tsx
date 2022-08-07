/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import SeekBar from "./SeekBar";
import Controls from "./Controls";

interface Props {
  children?: ReactNode;
}

const Player: FC<Props> = () => {
  return (
    <>
      <Controls />
      <SeekBar />
    </>
  );
};

export default Player;
