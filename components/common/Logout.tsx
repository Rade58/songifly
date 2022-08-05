/* eslint jsx-a11y/anchor-is-valid: 1 */
/* eslint jsx-a11y/no-noninteractive-tabindex: 1 */
/* eslint jsx-a11y/label-has-associated-control: 1 */
import React, { useState, useCallback } from "react";
import type { FC, ReactNode } from "react";
import Router from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";

interface Props {
  children?: ReactNode;
}

const Logout: FC<Props> = () => {
  const { userData, isLoading } = useCurrentUser();

  const [disabled, setDisabled] = useState(false);

  const handleLogout = useCallback(() => {
    if (disabled) return;

    setDisabled(true);

    fetch("/api/logout").then(() => {
      Router.push("/auth");
    });
  }, [disabled, setDisabled]);

  return (
    <div className="absolute top-4 right-9 dropdown dropdown-end">
      <label
        tabIndex={0}
        className="flex btn btn-sm btn-ghost avatar rounded-full bg-base-300"
      >
        <div className="w-7 rounded-full">
          <img src="https://placeimg.com/80/80/people" alt="logout-menu" />
        </div>
        <span className="font-bolder text-sm ml-2 normal-case">
          {isLoading ? "loading..." : userData.name}
        </span>
      </label>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
      >
        {/* <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li> */}
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Logout;
