/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, { useState } from "react";
import type { FC, ReactNode, ChangeEvent } from "react";

import ReactHowler from "react-howler";

interface Props {
  children?: ReactNode;
}

const SeekBar: FC<Props> = () => {
  // -- HOWLER VALUE (TODO) (THIS IS JUST TEMPORARRY)]
  // -- TODO- WE ARE GOING TO BRING THIS HERE FROM THE MACHINE
  const howlerSeekValue = 20;
  // ------------------------------------------------
  // ------------------------------------------------

  // FOT CONTROLED RANGE INPUT
  const [seekVal, setSeekVal] = useState<number>(0);

  // TO DETERMINE IF WE ARE GOING TO
  // FEED INPUT WITH HOWLER SEEK VALUUE OR LOCAL STATE VALUE
  const [useHowlerSeekValue, setUseHowlerSeekValue] = useState(true);

  // INTENDED FOR THE HOWLER (ONLY TIME IT IS GOING TO CHANGE
  // IS ON mouseup EVENT OF TH RANGE INPUT (WE DON'T WANT
  // TO CHANGE HOWLER VALUE onchange BECAUSE YOU WOULD
  // HAVE TOO MUCH ANOYING RERENDERING AS YOU SLIDE
  // RANGE ELEMENT))
  const [seekValueForHowler, setSeekValueForHowler] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSeekVal(+e.target.value);
  };

  const handleMouseDown = () => {
    setUseHowlerSeekValue(false);
  };

  const handleMouseUp = () => {
    setSeekValueForHowler(seekVal);
    setUseHowlerSeekValue(true);
  };

  // BUT ALSO A HOWLER SHOULD CHANGE THE PROGRESS AND A RANGE
  // BUT WE NEED TO STOP FEEDING THAT STATE TO OUR RANGE AND PROGRE
  // WHEN WE CLICK ON THE RANGE

  return (
    <div className="relative flex w-full border-0 border-rose-600 justify-between items-center">
      <div className="text-sm font-light opacity-75">1:24</div>
      <div className="player-progress-cont flex h-6 justify-center flex-col border-0 border-rose-600 w-10/12">
        <div className="hidden input-range-cont">
          <input
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onChange={handleChange}
            type="range"
            min={0}
            max={100}
            //
            value={!useHowlerSeekValue ? seekVal : howlerSeekValue}
            //
            className="range range-xs range-secondary"
          />
        </div>
        <div className="progress-cont flex">
          <progress
            className="progress progress-secondary progress-xs w-full"
            //
            value={!useHowlerSeekValue ? seekVal : howlerSeekValue}
            //
            max="100"
          ></progress>
        </div>
      </div>
      <div className="text-sm font-light opacity-75">{seekValueForHowler}</div>
    </div>
  );
};

export default SeekBar;
