/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const PlayerLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <main className="border-0 border-rose-600 w-screen h-screen">
        <aside className="border- border-rose-200 absolute top-0 h-screen w-[250px]">
          Sidebar
        </aside>

        <section className="cont">{children}</section>
        <footer className="border-2 border-teal-600 absolute w-screen h-24 bottom-0 left-0">
          Player
        </footer>
      </main>
      <style jsx>
        {
          /* css */ `
            .cont {
              width: calc(100vw - 250px);
              margin-left: 250px;
              border: crimson solid 1px;
              box-sizing: border-box;
              margin-bottom: 96px;
            }
          `
        }
      </style>
    </>
  );
};

export default PlayerLayout;
