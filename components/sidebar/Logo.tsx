/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import ThemeSwitcherButton from "./ThemeSwitcherButton";

interface Props {
  children?: ReactNode;
}

const Logo: FC<Props> = () => {
  return (
    <div className="bg-base-300 border-0 border-teal-600 h-16 mb-4 flex justify-between items-center pt-2">
      <Link href="/">
        <a className="mt-2">
          <Image src="/logo.svg" height={72} width={136} alt="logo" />
        </a>
      </Link>
      <ThemeSwitcherButton />
    </div>
  );
};

export default Logo;
