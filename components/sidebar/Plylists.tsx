/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Playlists: FC<Props> = () => {
  return (
    <>
      <ul className="playlists-menu border-0 border-indigo-900">
        {new Array(50).fill("Foo world playlist").map((val, i) => {
          return (
            <li key={val + i}>
              <a
                href="http://google.com"
                className="link"
                target={"_blank"}
                rel="noreferrer"
              >
                {val}
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
