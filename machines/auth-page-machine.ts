import { createMachine, assign, interpret } from "xstate";

import router from "next/router";

/**
 * @description finite states
 */
export const fs = {
  // OF THE AUTH PAGE
  off_auth: "off_auth",
  // ON THE AUTH PAGE
  on_auth: "on_auth",
  // SUBSTATES (COMPOUND STATES) OF on_auth STATE
  // THIS ARE GOING TO BE TATES FOR MODES (TO SHOW signin OR signup FORM)
  signin: "signin",
  signup: "signup",
  erroreus: "erroreus", // show error message for few
  // seconds (after few seconds you can enable forms again)
  // EXPLICIT DEFINITION OF COMPOUND STATES
  "on_auth.signin": "on_auth.signin",
  "on_auth.signup": "on_auth.signup",
  //  STATES FOR INVOKATIONS
  making_request: "making_request",
  // ANOTHER COMPOUND STATE INSIDE ALREADY COMPOUND STATE
  idle: "idle",
  // ANOTHER EXPLICIT DEFINITION FOR COMPOUND STATES
  // I DON'T KNOW IF I'M GOING TO USE ALL OF THESE, PROBABLY NOT
  "on_auth.signin.making_request": "on_auth.signin.making_request",
  "on_auth.signup.making_request": "on_auth.signup.making_request",
  //
  "on_auth.signin.idle": "on_auth.signin.idle",
  "on_auth.signup.idle": "on_auth.signup.idle",
  //
  "signin.idle": "signin.idle",
  "signup.idle": "signup.idle",
} as const;

/**
 * @description EVENTS
 */
export const EV = {
  PAGE_VISIT: "PAGE_VISIT",
  AUTH_MODE_TOGGLE: "AUTH_MODE_TOGGLE",
  BACK_TO_OFF_PAGE: "BACK_TO_OFF_PAGE",
  MAKE_SIGNUP_REQUEST: "MAKE_SIGNUP_REQUEST",
  MAKE_SIGNIN_REQUEST: "MAKE_SIGNIN_REQUEST",
} as const;

/**
 * @description actions
 */
const ac = {
  resetContext: "resetContext",
  performDisableForms: "performDisableForms",
  performEnableForms: "performEnableForms",
  markReqAsSuccess: "markReqAsSuccess",
  markReqAssFailiure: "markReqAssFailiure",
  // setNetworkError: "setNetworkError",
  // wipeNetworkError: "wipeNetworkError",
  setSignupSuccessData: "setSignupSuccessData",
  setSigninSuccessData: "setSigninSuccessData",
} as const;

// --------------------------------------------------
// --------------------------------------------------
// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  disableForms: boolean;
  successfulRequest: boolean; //navigate somewhere from out page if this becomes true (to some authorized page)
  networkError?: string;
  data?: {
    username?: string;
    email: string;
    password: string;
  };
}

export type machineEventsGenericType =
  | {
      type: typeof EV.PAGE_VISIT;
    }
  | { type: typeof EV.AUTH_MODE_TOGGLE }
  | { type: typeof EV.BACK_TO_OFF_PAGE }
  | {
      type: typeof EV.MAKE_SIGNUP_REQUEST;
      payload: {
        username: string;
        email: string;
        password: string;
      };
    }
  | {
      type: typeof EV.MAKE_SIGNIN_REQUEST;
      payload: {
        email: string;
        password: string;
      };
    };

export type machineFiniteStatesGenericType =
  | {
      value: typeof fs.off_auth;
      context: MachineContextGenericI & {
        disableForms: true;
        successfulRequest: false;
        networkError: undefined;
      };
    }
  | {
      value: typeof fs.on_auth;
      context: MachineContextGenericI;
    }
  | {
      value: typeof fs.erroreus;
      context: MachineContextGenericI & {
        disableForms: true;
        successfulRequest: false;
        networkError: string;
        data: undefined;
      };
    }

  // you need to do this for compound states to have better types
  | {
      value: { [fs.on_auth]: typeof fs.signin };
      context: MachineContextGenericI & { disableForms: false };
    }
  | {
      value: { [fs.on_auth]: typeof fs.signup };
      context: MachineContextGenericI & { disableForms: false };
    }
  //  even deeper compound states
  | {
      value: { [fs.on_auth]: { [fs.signup]: typeof fs["making_request"] } };
      context: MachineContextGenericI & { disableForms: true };
    }
  | {
      value: { [fs.on_auth]: { [fs.signin]: typeof fs["making_request"] } };
      context: MachineContextGenericI & { disableForms: true };
    }
  //
  | {
      value: { [fs.on_auth]: { [fs.signup]: typeof fs.idle } };
      context: MachineContextGenericI & { disableForms: false };
    }
  | {
      value: { [fs.on_auth]: { [fs.signin]: typeof fs.idle } };
      context: MachineContextGenericI & { disableForms: false };
    };

// -----------------  MACHINE --------------------

const authPageMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>(
  {
    key: "auth",
    initial: fs.off_auth,
    context: {
      // enable form only when you get inside on_auth
      disableForms: true,
      successfulRequest: false,
      // networkError IS undefined on start (data also)
    },
    // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER
    // YOU CANDEFINE TRANSITION HERE TOO-----
    on: {
      /* 
    [EV.CHECK_CURRENT_DARK_MODE]: {
      actions: [
        assign((ctx, event) => {
          const { isDark } = event.payload;

          return {
            isDarkMode: isDark,
          };
        }),
      ],
    },
    */

      // THIS IS MY TRANSITION, NO MATTER IN WHICH STATE YOUR MACHINE IS
      // THIS TRANSITION WILL HAPPEN ON THIS EVENT
      [EV.BACK_TO_OFF_PAGE]: {
        target: fs.off_auth,
        // HERE SHOULD BE AN ACTIONS TO RESET THE CONTEXT
        // AND ACTION TO NAVIGATE ON SOME AUTHENTICATED PAGE
      },
    },
    // -------------------------------------------------------------------
    states: {
      [fs.erroreus]: {
        //
        //
      },

      [fs.off_auth]: {
        on: {
          [EV.PAGE_VISIT]: {
            // ADDING DOT BEFORE IT BECAUSE I SAW IT LIKE THIS
            // INSIDE DOCS
            // BUT DOESN'T WORK
            // target: `.${fs["on_auth.signin.idle"]}`,
            // THIS WORKS (WITHOUT DOT ON THE FRONT):
            target: fs["on_auth.signin.idle"],
          },
        },
      },
      [fs.on_auth]: {
        // COMPOUND STATES
        // DON'T NEED INITIAL BECAUSE ON EVENT I AM JUMPING DIRECTLY
        // TO SOME OF THESE STATES, YOU CAN SEE BY YOURSELF WHICH ONE
        // AND ON WHAT EVENT THIS HAPPENS
        // initial: fs.on_auth,
        states: {
          [fs.signin]: {
            on: {
              [EV.AUTH_MODE_TOGGLE]: {
                target: fs.signup,
              },
            },
            //
            initial: fs.idle,
            //
            states: {
              [fs.idle]: {
                //
                on: {
                  [EV.MAKE_SIGNIN_REQUEST]: {
                    target: fs.making_request,
                  },
                },
              },
              [fs.making_request]: {
                //
              },
            },

            //
          },
          [fs.signup]: {
            on: {
              [EV.AUTH_MODE_TOGGLE]: {
                target: fs.signin,
              },
            },
            //
            initial: fs.idle,
            //
            states: {
              [fs.idle]: {
                //
                on: {
                  [EV.MAKE_SIGNUP_REQUEST]: {
                    target: fs.making_request,
                  },
                },
              },
              [fs.making_request]: {
                //
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      [ac.resetContext]: assign((_, __) => {
        return {
          data: undefined,
          disableForms: false,
          networkError: undefined,
          successfulRequest: false,
        };
      }),
      [ac.performEnableForms]: assign((_, __) => {
        return { disableForms: false };
      }),
      [ac.performDisableForms]: assign((_, __) => {
        return { disableForms: true };
      }),
      [ac.markReqAsSuccess]: assign((_, __) => {
        return {
          successfulRequest: true,
        };
      }),
      [ac.markReqAssFailiure]: assign((_, __) => {
        return {
          successfulRequest: false,
        };
      }),
      [ac.setSignupSuccessData]: assign((_, event) => {
        if (event.type !== "MAKE_SIGNUP_REQUEST") return {};

        return {
          data: event.payload,
        };
      }),
      [ac.setSigninSuccessData]: assign((_, event) => {
        if (event.type !== "MAKE_SIGNIN_REQUEST") return {};

        return {
          data: event.payload,
        };
      }),
    },
  }
);

export const authPageService = interpret(authPageMachine);

authPageService.onTransition((state, event) => {
  //
  // console.log({ isDarkMode: state.context.isDarkMode });
  // console.log("TRANSITION");
});
