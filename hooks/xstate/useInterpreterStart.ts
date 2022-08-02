/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useEffect } from "react";
import { Interpreter } from "xstate";

/**
 *
 * @param interpreter (pass machine here)
 */
const useInterpreterStart = (interpreter: any) => {
  useEffect(() => {
    //
    //

    if (interpreter instanceof Interpreter && !interpreter.initialized) {
      interpreter.start();

      // console.log(interpreter);

      // interpreter.send("PAGE_VISIT");
    }

    return () => {
      if (interpreter instanceof Interpreter && interpreter.initialized) {
        interpreter.stop();
      }
    };
  }, [interpreter]);

  return interpreter as unknown as Interpreter<any>;
};

export default useInterpreterStart;
