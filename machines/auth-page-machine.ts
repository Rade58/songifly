import { createMachine, assign, interpret } from "xstate";
import router from "next/router";
import fetcher from "@/lib/fetcher";

// I USED FETCHER LIKE THIS ONLY BECAUSE I WANT IT TO BE
// EASIER TO MOCK WHEN I USE VISUALIZER
// BECUSE I WANT TO TEST FAILIURE TOO
const fetcherSignUp = fetcher;
const fetcherSignIn = fetcher;

// I CASE OF NESTED STATES TARGET REFERENCING CAN BE A LITTLE BIT
// COMPLICATED THEREFORE I AM GOING TO DEFINE A HELPER
/**
 *
 * @param machineId
 * @param states
 * @returns string
 * @description used in case of compound state, when you want to build a target
 */
const buildTarget = (
  machineId: string,
  ...states: (keyof typeof fs)[]
): string => {
  //
  return "#" + machineId + states.map((state) => "." + state).join("");
};

// THIS IS ONE OF THE ACTIONS
const navigateOfThePage = () => {
  // WE WILL CHANGE THIS ROUTE LATER
  // router.push("/tryout");
};

// MACHINE ID AND (key IS MARKING MACHINE AS AN ACTOR)
// (TODO I GOT TO RENEW MY KNOLEDGE ON ACTOR MODEL)

const machineId = "auth-machine";
const key = "auth_machine_actor";
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
/**
 * @description finite states (not using enums because they are not supported in visualizer)
 */
export const fs = {
  // OF THE AUTH PAGE
  off_auth: "off_auth",
  leaving_page: "leaving_page",
  on_auth: "on_auth",
  signin: "signin",
  signup: "signup",
  making_request: "making_request",
  idle: "idle",
} as const;

//
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
  turnOnLoader: "turnOnLoader",
  turnOffLoader: "turnOffLoader",
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
  isLoading: boolean;
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
      context: MachineContextGenericI & { isLoading: true };
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
      context: MachineContextGenericI & { disableForms: true; isLoading: true };
    }
  | {
      value: { [fs.on_auth]: { [fs.signin]: typeof fs["making_request"] } };
      context: MachineContextGenericI & { disableForms: true; isLoading: true };
    }
  //
  | {
      value: { [fs.on_auth]: { [fs.signup]: typeof fs.idle } };
      context: MachineContextGenericI & {
        disableForms: false;
        isLoading: false;
      };
    }
  | {
      value: { [fs.on_auth]: { [fs.signin]: typeof fs.idle } };
      context: MachineContextGenericI & {
        disableForms: false;
        isLoading: false;
      };
    };

// -----------------  MACHINE --------------------

const authPageMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>(
  {
    id: machineId,
    key,
    initial: fs.off_auth,
    context: {
      // enable form only when you get inside on_auth
      disableForms: true,
      // networkError IS undefined on start (data also)
      isLoading: false,
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
                target: buildTarget(
                  machineId,
                  fs["on_auth"],
                  fs["signin"],
                  fs["idle"]
                ),
              },
            },
          },
          [fs.leaving_page]: {
            // WE SHOULD DO CLEANUP IN HERE I THINK
            entry: [
              ac.resetContext,
              ac.turnOnLoader,
              ac.performDisableForms,
              ac.navigateOfThePage,
            ],
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
                    target: buildTarget(
                      machineId,
                      fs["on_auth"],
                      fs["signup"],
                      fs["idle"]
                    ),
                  },

                  [EV.MAKE_SIGNIN_REQUEST]: {
                    target: fs.making_request,
                    actions: [ac.setSigninBodyData],
                  },
                },
              },
              [fs.making_request]: {
                entry: [ac.performDisableForms, ac.turnOnLoader],
                //
                invoke: {
                  // id: "signin-request",
                  src: (ctx, _) => {
                    return fetcherSignIn("/signin", ctx.data);
                  },
                  onDone: {
                    target: buildTarget(
                      machineId,
                      fs["off_auth"],
                      fs["leaving_page"]
                    ),
                    actions: [ac.turnOffLoader],
                  },
                  onError: {
                    target: buildTarget(
                      machineId,
                      fs["on_auth"],
                      fs["signin"],
                      fs["idle"]
                    ),
                    // SET ERROR MESSAGE IN HERE
                    actions: [
                      assign((ctx, ev) => {
                        return { networkError: ev.data.errors[0] };
                      }),
                      ac.performEnableForms,
                      ac.turnOffLoader,
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
                    target: buildTarget(
                      machineId,
                      fs["on_auth"],
                      fs["signin"],
                      fs["idle"]
                    ),
                  },

                  [EV.MAKE_SIGNUP_REQUEST]: {
                    target: fs.making_request,

                    actions: [ac.setSignupBodyData],
                  },
                },
              },
              [fs.making_request]: {
                entry: [ac.performDisableForms, ac.turnOnLoader],

                //
                invoke: {
                  // id: "signup-request",
                  src: (ctx, _) => {
                    return fetcherSignUp("/signup", ctx.data);
                  },
                  onDone: {
                    target: buildTarget(
                      machineId,
                      fs["off_auth"],
                      fs["leaving_page"]
                    ),
                    actions: [ac.turnOffLoader],
                  },
                  onError: {
                    target: buildTarget(
                      machineId,
                      fs["on_auth"],
                      fs["signup"],
                      fs["idle"]
                    ),
                    // SET ERROR MESSAGE IN HERE
                    actions: [
                      assign((ctx, ev) => {
                        return { networkError: ev.data.errors[0] };
                      }),
                      ac.performEnableForms,
                      ac.turnOffLoader,
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
          isLoading: false,
        };
      }),
      [ac.performEnableForms]: assign((_, __) => {
        return { disableForms: false };
      }),
      [ac.performDisableForms]: assign((_, __) => {
        return { disableForms: true };
      }),
      [ac.turnOnLoader]: assign((_, __) => {
        return { isLoading: true };
      }),
      [ac.turnOffLoader]: assign((_, __) => {
        return { isLoading: false };
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
