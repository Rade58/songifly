/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import Image from "next/image";

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
      <div className="overflow-x-auto w-full">
        <table className="table-compact w-full">
          {/* <!-- head --> */}
          <thead>
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
                <td className="border border-rose-200 w-14">
                  {/* <label>
                    <input type="checkbox" className="checkbox" />
                  </label> */}
                  <span className="num-of-song">{i + 1}</span>
                  <span className="play-icon hidden">play icon</span>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-square w-12 h-12">
                        <Image
                          priority
                          layout="fill"
                          src="https://placeimg.com/192/192/people"
                          alt="avatar"
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
                  <button className="btn btn-ghost btn-xs">details</button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* <!-- foot --> */}
          <tfoot>
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
          </tfoot>
        </table>
      </div>
      <style jsx>{/* css */ ``}</style>
    </>
  );
};

export default SongsTable;
