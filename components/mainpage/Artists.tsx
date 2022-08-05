/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import Image from "next/image";

interface Props {
  children?: ReactNode;
  artists: {
    name: string;
  }[];
}

const Artists: FC<Props> = ({ artists }) => {
  return (
    <section className="mb-11 mx-8 overflow-hidden pt-8">
      <h2 className="font-bold text-xl">Top Artists This Mounth</h2>
      <p className="font-normal text-sm mt-8">Only visible to you</p>
      <div className="mt-16 flex flex-wrap gap-4 items-between justify-evenly border-0 border-rose-500">
        {artists.map(({ name }) => (
          <div
            key={name}
            className="shadow-xs shadow-black h-64 bg-base-300 card flex flex-col justify-evenly items-center relative border-0 border-rose-200"
          >
            <div className="avatar w-44">
              <div
                className={`w-36 mx-auto overflow-hidden border-0 border-rose-400 rounded-full relative`}
              >
                {/* <img src="https://placeimg.com/192/192/people" /> */}
                <Image
                  priority
                  layout="fill"
                  src="https://placeimg.com/192/192/people"
                  alt="avatar"
                />
              </div>
            </div>
            <h2 className="font-bold text-sm mr-auto ml-4">{name}</h2>
            <p className="font-bolder text-xs mr-auto ml-4">Artist</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Artists;
