/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import Sidebar from "@/components/sidebar/Sidebar";

import PlayerBar from "@/components/player/PlayerBar";

interface Props {
  children?: ReactNode;
}

const PlayerLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <main className="border-0 border-rose-600 w-screen h-screen">
        <aside className="sidebar-cont absolute top-0 h-screen w-56 border-r-1 border-x-base-100 shadow-lg shadow-black">
          <Sidebar />
        </aside>

        <section className="cont">{children}</section>
        <footer className="border-0 border-teal-600 absolute w-screen h-24 bottom-0 left-0 bg-base-300 shadow-xl shadow-black border-t-base-100 border-t-2">
          <PlayerBar />
        </footer>
      </main>
      <style jsx>
        {
          /* css */ `
            .cont {
              width: calc(100vw - 14rem);
              margin-left: 14rem;
              border: crimson solid 0px;
              box-sizing: border-box;
              margin-bottom: 6rem;
            }

            .sidebar-cont {
              height: calc(100vh - 6rem);
            }
          `
        }
      </style>
    </>
  );
};

export default PlayerLayout;
