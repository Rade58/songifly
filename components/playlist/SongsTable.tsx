/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

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
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>
                #
                {/* <label>
                <input type="checkbox" className="checkbox" />
              </label> */}
              </th>
              <th>Title</th>
              <th>Title</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {songs.map(({ name }, i) => (
              <tr key={name} className="song-row">
                <th>
                  {/* <label>
                    <input type="checkbox" className="checkbox" />
                  </label> */}
                  <span className="num-of-song">{i + 1}</span>
                  <span className="play-icon hidden">play icon</span>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="/tailwind-css-component-profile-2@56w.png"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* <!-- foot --> */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <style jsx>{/* css */ ``}</style>
    </>
  );
};

export default SongsTable;
