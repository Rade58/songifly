/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import useThemeSwitcher from "@/hooks/useThemeSwitcher";

interface Props {
  children?: ReactNode;
}

const ThemeSwitcher: FC<Props> = () => {
  const { theme, changeTheme, availableThemes } = useThemeSwitcher();

  return (
    <button onMouseDown={() => changeTheme()} className="btn">
      Button
    </button>
  );
};

export default ThemeSwitcher;
