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
        <div className="border-0 border-rose-200 absolute top-0 h-screen w-[250px]">
          Sidebar
        </div>

        <div className="cont">{children}</div>
      </main>
      <style jsx>
        {
          /* css */ `
            .cont {
              width: calc(100vw - 250px);
              margin-left: 250px;
              border: crimson solid 1px;
              box-sizing: border-box;
            }
          `
        }
      </style>
    </>
  );
};

export default PlayerLayout;
