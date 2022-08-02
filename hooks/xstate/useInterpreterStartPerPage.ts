/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useEffect } from "react";

import { useRouter } from "next/router";

import { Interpreter } from "xstate";

/**
 *
 * @param path to the page where you want to use machine
 * @param interpreter (pass machine here)
 */
const useInterpreterStartPerPage = (path: string, interpreter: any) => {
  const { pathname } = useRouter();

  useEffect(() => {
    //
    //

    if (
      interpreter instanceof Interpreter &&
      pathname === path &&
      !interpreter.initialized
    ) {
      interpreter.start();

      // console.log(interpreter);

      interpreter.send("PAGE_VISIT");
    }

    return () => {
      if (
        interpreter instanceof Interpreter &&
        pathname === path &&
        interpreter.initialized
      ) {
        interpreter.stop();
      }
    };
  }, [pathname, interpreter, path]);

  return interpreter as unknown as Interpreter<any>;
};

export default useInterpreterStartPerPage;
