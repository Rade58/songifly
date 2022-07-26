/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Logo from "./Logo";

import Playlists from "./Plylists";

import { mainLinks, otherLinks } from "@/constants/links";

interface Props {
  children?: ReactNode;
}

const Sidebar: FC<Props> = () => {
  const { pathname } = useRouter();

  // console.log(pathname);
  return (
    <>
      <div className="sidebar-data border-0 border-gray-500 h-full">
        <Logo />
        <ul className="nav-list menu menu-compact bg-base-300 w-full border-1 border-rose-800">
          {/* ------ */}

          {mainLinks.map(({ icon: Icon, name, route }, i) => {
            return (
              <li
                key={name + i}
                className={`${pathname === route ? "bordered" : ""} ${
                  mainLinks.length === i + 1 ? "mb-4" : ""
                }`.trim()}
              >
                <Link href={route}>
                  <a>
                    <Icon size={28} />
                    <span className="text-sm">{name}</span>
                  </a>
                </Link>
              </li>
            );
          })}
          {/* ------ */}

          {otherLinks.map(({ icon: Icon, name, route, isLink }, i) => {
            return (
              <li
                key={name + i}
                className={`${pathname === route ? "bordered" : ""}`.trim()}
              >
                {isLink ? (
                  <Link href={route}>
                    <a>
                      <Icon size={28} />
                      <span className="text-sm">{name}</span>
                    </a>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      console.log("Create Playlist");
                    }}
                  >
                    <Icon size={28} />
                    <span className="text-sm">{name}</span>
                  </button>
                )}
              </li>
            );
          })}

          {/* ------ */}
        </ul>
        <div className="bg-base-300 mb-0 shadow-xl -mt-1 drop-shadow-2xl shadow-slate-900">
          <div className="divider ml-5 mr-6 my-0 relative top-1.5"></div>
        </div>
        {/* --------- */}
        <div className="playlist-cont">
          <Playlists />
        </div>
      </div>

      <style jsx>
        {
          /* css */ `
            .sidebar-data {
              --height1: 233px;
            }

            .nav-list {
              height: var(--height1);
            }

            .playlist-cont {
              border: crimson solid 0px;
              height: calc(100% - var(--height1) - 4rem - 29px);
              overflow: hidden;
            }
          `
        }
      </style>
    </>
  );
};

export default Sidebar;
