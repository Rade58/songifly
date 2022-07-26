/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Playlists: FC<Props> = () => {
  return (
    <>
      <ul className="playlists-menu border-0 border-indigo-900 py-1.5 bg-base-300">
        {new Array(50).fill("Foo world playlist").map((val, i) => {
          return (
            <li key={val + i} className="ml-5 mr-4 my-3 text-sm">
              <a
                href="http://google.com"
                className="link no-underline opacity-70 hover:opacity-100 cursor-default"
                target={"_blank"}
                rel="noreferrer"
              >
                {val + " " + i}
              </a>
            </li>
          );
        })}
      </ul>
      <style jsx>
        {
          /*css */ `
            .playlists-menu {
              overflow-y: auto;
              height: 100%;
              /* height: 380px; */
            }
          `
        }
      </style>
    </>
  );
};

export default Playlists;
