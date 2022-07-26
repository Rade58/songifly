/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Logo from "./Logo";

import { mainLinks, otherLinks } from "@/constants/links";

interface Props {
  children?: ReactNode;
}

const Sidebar: FC<Props> = () => {
  const { pathname } = useRouter();

  // console.log(pathname);
  return (
    <div className="border-0 border-gray-500">
      <Logo />
      <ul className="menu bg-base-100 w-full">
        {/* ------ */}

        {mainLinks.map(({ icon: Icon, name, route }, i) => {
          return (
            <li
              key={name + i}
              className={`${pathname === route ? "bordered" : ""} ${
                mainLinks.length === i + 1 ? "mb-6" : ""
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

        {otherLinks.map(({ icon: Icon, name, route }, i) => {
          return (
            <li
              key={name + i}
              className={`${pathname === route ? "bordered" : ""}`.trim()}
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
      </ul>
      <div>
        <div className="divider mx-6"></div>
      </div>
    </div>
  );
};

export default Sidebar;
