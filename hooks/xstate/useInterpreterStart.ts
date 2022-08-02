/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useEffect } from "react";

import { useRouter } from "next/router";

import { Interpreter } from "xstate";

/**
 *
 * @param path to the page where you want to use machine
 * @param interpreter (pass machine here)
 */
const useInterpreterStart = (path: string, interpreter: any) => {
  const { pathname } = useRouter();

  useEffect(() => {
    //
    //

    if (
      interpreter instanceof Interpreter &&
      pathname === path &&
      interpreter.initialized
    ) {
      interpreter.start();
    }

    return () => {
      if (
        interpreter instanceof Interpreter &&
        pathname === path &&
        !interpreter.initialized
      ) {
        interpreter.stop();
      }
    };
  }, [pathname]);
};

export default useInterpreterStart;
