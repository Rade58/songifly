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
    <section>
      Text
      <div className="flex flex-wrap justify-evenly border border-rose-500">
        {artists.map(({ name }) => (
          <div key={name} className="relative w-56 border border-rose-200">
            Hello world
            <div className="avatar relative w-44 border border-rose-200">
              <div className="w-24 rounded-full">
                <Image
                  priority
                  layout="fill"
                  src="https://placeimg.com/192/192/people"
                  alt="artist"
                />
              </div>
            </div>
            <h2>{name}</h2>
            <p>artist</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Artists;
