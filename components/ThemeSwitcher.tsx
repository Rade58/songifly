/* eslint jsx-a11y/anchor-is-valid: 1 */

// NO OP NO OP NO OP
// NO OP NO OP NO OP
// NO OP NO OP NO OP
// NO OP NO OP NO OP
// NO OP NO OP NO OP

import React from "react";
import type { FC, ReactNode } from "react";

import useThemeSwitcher from "@/hooks/useThemeSwitcher";

interface Props {
  children?: ReactNode;
}

const ThemeSwitcher: FC<Props> = () => {
  const { toggleTheme } = useThemeSwitcher();

  return (
    <button onMouseDown={() => toggleTheme()} className="btn btn-primary">
      Button
    </button>
  );
};

export default ThemeSwitcher;
