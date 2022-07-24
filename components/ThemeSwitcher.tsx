/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import useThemeSwitcher from "@/hooks/useThemeSwitcher";

interface Props {
  children?: ReactNode;
}

const ThemeSwitcher: FC<Props> = () => {
  const { changeTheme } = useThemeSwitcher();

  return (
    <button onMouseDown={() => changeTheme()} className="btn btn-primary">
      Button
    </button>
  );
};

export default ThemeSwitcher;
