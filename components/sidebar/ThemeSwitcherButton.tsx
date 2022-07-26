/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import useThemeSwitcher from "@/hooks/useThemeSwitcher";

import themes from "../../theme/daisy-themes";

interface Props {
  children?: ReactNode;
}

const ThemeSwitcherButton: FC<Props> = () => {
  const { toggleTheme, theme } = useThemeSwitcher();

  console.log({ theme, themes });

  // @ts-ignore
  const color = theme !== themes[0] ? "#f0d50c" : "#151d33";
  const sunOrMoon = themes[0] !== theme;

  return (
    <button
      className="btn btn-circle btn-ghost btn-sm mr-3"
      onClick={toggleTheme}
    >
      {sunOrMoon ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeSwitcherButton;
