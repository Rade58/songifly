/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import useThemeSwitcher from "@/hooks/useThemeSwitcher";

interface Props {
  children?: ReactNode;
}

const ThemeSwitcherLink: FC<Props> = () => {
  const { toggleTheme } = useThemeSwitcher();

  return (
    <li
      onClick={toggleTheme}
      // eslint-disable-next-line
      role="button"
      tabIndex={0}
      onKeyPress={toggleTheme}
    >
      <span>
        <button className="btn btn-circle btn-outline btn-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </span>
    </li>
  );
};

export default ThemeSwitcherLink;
