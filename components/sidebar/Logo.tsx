/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

interface Props {
  children?: ReactNode;
}

const Logo: FC<Props> = () => {
  return (
    <div className="border border-teal-600 h-16 mb-4">
      <Link href="/">
        <a>
          <Image src="/logo.svg" height={72} width={136} alt="logo" />
        </a>
      </Link>
    </div>
  );
};

export default Logo;
