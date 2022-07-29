import { createMachine, assign, interpret } from "xstate";

import router from "next/router";

import fetcher from "@/lib/fetcher";

// I USED FETCHER LIKE THIS ONLY BECAUSE I WANT IT TO BE
// EASIER TO MOCK WHEN I USE VISUALIZER
// BECUSE I WANT TO TEST FAILIURE TOO
const fetcherSignUp = fetcher;
const fetcherSignIn = fetcher;

// THIS IS ONE OF THE ACTIONS
const navigateOfThePage = () => {
  // WE WILL CHANGE THIS ROUTE LATER
  router.push("/tryout");
};

/**
 * @description finite states (not using enums because they are not supported in visualizer)
 */
export const fs = {
  // OF THE AUTH PAGE
  off_auth: "off_auth",
  //
  leaving_page: "leaving_page",
  "off_auth.leaving_page": "off_auth.leaving_page",
  "off_auth.idle": "off_auth.idle",
  // ------------------------------------------------
  //______ ON THE AUTH PAGE
  on_auth: "on_auth",
  // SUBSTATES (COMPOUND STATES) OF on_auth STATE
  // THIS ARE GOING TO BE TATES FOR MODES (TO SHOW signin OR signup FORM)
  signin: "signin",
  signup: "signup",
  // EXPLICIT DEFINITION OF COMPOUND STATES
  "on_auth.signin": "on_auth.signin",
  "on_auth.signup": "on_auth.signup",
  // STATES FOR INVOKATIONS
  making_request: "making_request",
  // ANOTHER COMPOUND STATE INSIDE ALREADY COMPOUND STATE
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
  //--------------------------------------------------
  //
  //
  idle: "idle",
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
  setSignupBodyData: "setSignupBodyData",
  setSigninBodyData: "setSigninBodyData",
  navigateOfThePage: "navigateOfThePage",
  //
  clearError: "clearError",
} as const;

// --------------------------------------------------
// --------------------------------------------------
// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  disableForms: boolean;
  // successfulRequest: boolean; //navigate somewhere from out page if this becomes true (to some authorized page)
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
        networkError: undefined;
      };
    }
  | {
      value: { [fs.off_auth]: typeof fs.idle };
      context: MachineContextGenericI;
    }
  | {
      value: { [fs.off_auth]: typeof fs.leaving_page };
      context: MachineContextGenericI;
    }
  | {
      value: typeof fs.on_auth;
      context: MachineContextGenericI;
    }
  | {
      value: { [fs.on_auth]: typeof fs.signin };
      context: MachineContextGenericI & { disableForms: false };
    }
  | {
      value: { [fs.on_auth]: typeof fs.signup };
      context: MachineContextGenericI & { disableForms: false };
    }
  //
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

const id = "auth-machine";
const hashedId = `#${id}`;
const dot = ".";
const hashedIdDot = `${hashedId + dot}`;
const hash = "#";

const authPageMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>(
  {
    id: id,
    // key: "auth",
    initial: fs.off_auth,
    context: {
      // enable form only when you get inside on_auth
      disableForms: true,
      // networkError IS undefined on start (data also)
    },
    // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER
    // YOU CAN DEFINE TRANSITION HERE TOO-----
    // on: {
    // I THINK THIS EVENT I'MNOT GOING TO USE AT ALL
    // THIS IS MY TRANSITION, NO MATTER IN WHICH STATE YOUR MACHINE IS
    // THIS TRANSITION WILL HAPPEN ON THIS EVENT
    // [EV.BACK_TO_OFF_PAGE]: {
    // target: fs.off_auth,
    // HERE SHOULD BE AN ACTIONS TO RESET THE CONTEXT
    // AND ACTION TO NAVIGATE ON SOME AUTHENTICATED PAGE
    // },
    // },
    // -------------------------------------------------------------------
    states: {
      [fs.off_auth]: {
        id: fs.off_auth,

        //
        initial: fs.idle,
        //
        states: {
          //
          [fs.idle]: {
            //
            on: {
              [EV.PAGE_VISIT]: {
                // ADDING DOT BEFORE IT BECAUSE I SAW IT LIKE THIS
                // INSIDE DOCS
                // BUT DOESN'T WORK
                // target: `.${fs["on_auth.signin.idle"]}`,
                // THIS WORKS (WITHOUT DOT ON THE FRONT):
                target: hashedIdDot + fs["on_auth.signin.idle"],
              },
            },
          },
          [fs.leaving_page]: {
            // WE SHOULD DO CLEANUP IN HERE I THINK
            entry: [ac.resetContext, ac.navigateOfThePage],
            type: "final",
          },
        },
      },
      [fs.on_auth]: {
        id: fs.on_auth,

        entry: [ac.performEnableForms],

        // COMPOUND STATES
        // DON'T NEED INITIAL BECAUSE ON EVENT I AM JUMPING DIRECTLY
        // TO SOME OF THESE STATES, YOU CAN SEE BY YOURSELF WHICH ONE
        // AND ON WHAT EVENT THIS HAPPENS
        states: {
          [fs.signin]: {
            id: fs.signin,
            //

            initial: fs.idle,
            //
            states: {
              [fs.idle]: {
                after: {
                  3600: {
                    actions: [ac.clearError],
                  },
                },
                //
                on: {
                  [EV.AUTH_MODE_TOGGLE]: {
                    target:
                      hashedIdDot +
                      hash +
                      fs["on_auth"] +
                      hash +
                      fs["signup.idle"],
                  },

                  [EV.MAKE_SIGNIN_REQUEST]: {
                    target: fs.making_request,
                    actions: [ac.setSigninBodyData],
                  },
                },
              },
              [fs.making_request]: {
                entry: [ac.performDisableForms],
                //
                invoke: {
                  // id: "signin-request",
                  src: (ctx, _) => {
                    return fetcherSignIn("/signin", ctx.data);
                  },
                  onDone: {
                    target:
                      hashedIdDot +
                      hash +
                      fs["off_auth"] +
                      dot +
                      fs["leaving_page"],
                    // actions:
                  },
                  onError: {
                    target:
                      hashedIdDot +
                      hash +
                      fs["on_auth"] +
                      hash +
                      fs["signin"] +
                      dot +
                      fs["idle"],
                    // SET ERROR MESSAGE IN HERE
                    actions: [
                      assign((ctx, ev) => {
                        return { networkError: ev.data.errors[0] };
                      }),
                      ac.performEnableForms,
                    ],
                  },
                },
              },
            },

            //
          },
          [fs.signup]: {
            id: fs.signup,

            //
            // initial: fs.idle,
            //
            states: {
              [fs.idle]: {
                after: {
                  3600: {
                    actions: [ac.clearError],
                  },
                },
                //
                on: {
                  [EV.AUTH_MODE_TOGGLE]: {
                    target:
                      hashedIdDot +
                      hash +
                      fs["on_auth"] +
                      hash +
                      fs["signin"] +
                      dot +
                      fs["idle"],
                  },

                  [EV.MAKE_SIGNUP_REQUEST]: {
                    target: fs.making_request,

                    actions: [ac.setSignupBodyData],
                  },
                },
              },
              [fs.making_request]: {
                entry: [ac.performDisableForms],

                //
                invoke: {
                  // id: "signup-request",
                  src: (ctx, _) => {
                    return fetcherSignUp("/signup", ctx.data);
                  },
                  onDone: {
                    target:
                      hashedIdDot +
                      hash +
                      fs["off_auth"] +
                      dot +
                      fs["leaving_page"],
                    // actions
                  },
                  onError: {
                    target:
                      hashedIdDot +
                      hash +
                      fs["on_auth"] +
                      hash +
                      fs["signup"] +
                      dot +
                      fs["idle"],
                    // SET ERROR MESSAGE IN HERE
                    actions: [
                      assign((ctx, ev) => {
                        return { networkError: ev.data.errors[0] };
                      }),
                      ac.performEnableForms,
                    ],
                  },
                },
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

      [ac.setSignupBodyData]: assign((_, event) => {
        if (event.type !== "MAKE_SIGNUP_REQUEST") return {};

        return {
          data: event.payload,
        };
      }),
      [ac.setSigninBodyData]: assign((_, event) => {
        if (event.type !== "MAKE_SIGNIN_REQUEST") return {};

        return {
          data: event.payload,
        };
      }),
      [ac.clearError]: assign((_, __) => {
        return { networkError: undefined };
      }),
      [ac.navigateOfThePage]: navigateOfThePage,
    },
  }
);

const authPageActor = interpret(authPageMachine);

authPageActor.onTransition((state, event) => {
  console.log({ authMachineCurrentState: state.value });

  console.log({ networkError: state.context.networkError });
});

export default authPageActor;
