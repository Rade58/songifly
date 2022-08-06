/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import Image from "next/image";

import { IoIosPlay } from "react-icons/io";

import type { Song } from "@prisma/client";

interface Props {
  children?: ReactNode;
  songs: (Song & {
    artist: {
      name: string;
      id: number;
    };
  })[];
}

const SongsTable: FC<Props> = ({ songs }) => {
  return (
    <>
      <div className="overflow-x-auto mx-12 mt-16">
        <table className="songs-table table-compact w-full">
          {/* <!-- head --> */}
          <thead className="border-b border-base-300">
            <tr>
              <th>
                #
                {/* <label>
                <input type="checkbox" className="checkbox" />
              </label> */}
              </th>
              <th>title</th>
              <th>album</th>
              <th>date added</th>
              <th>time icon</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {songs.map(({ name, artist: { name: artist } }, i) => (
              <tr key={name} className="song-row">
                <td className="border-0 border-rose-200 w-14">
                  {/* <label>
                    <input type="checkbox" className="checkbox" />
                  </label> */}
                  <span className="num-of-song">{i + 1}</span>
                  <span className="play-icon hidden">
                    <button className="btn btn-ghost btn-xs">
                      <IoIosPlay size={19} />
                    </button>
                  </span>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-square w-8 h-8">
                        <Image
                          priority
                          layout="fill"
                          src="https://placeimg.com/192/192/people"
                          alt="song"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{name}</div>
                      <div className="text-sm opacity-50">{artist}</div>
                    </div>
                  </div>
                </td>
                <td>
                  Tool lookalike
                  {/* <br /> */}
                  {/* <span className="badge badge-ghost badge-sm">
                    Desktop Support 
                  </span> */}
                </td>
                <td>9 hours ago</td>
                <td>
                  <button className="btn btn-ghost btn-xs">3:66</button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* <!-- foot --> */}
          {/* <tfoot>
            <tr>
              <th>
                #
               
              </th>
              <th>title</th>
              <th>album</th>
              <th>date added</th>
              <th>time icon</th>
            </tr>
          </tfoot> */}
        </table>
      </div>
      <style jsx>{/* css */ ``}</style>
    </>
  );
};

export default SongsTable;
