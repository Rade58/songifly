import { createMachine, assign, interpret } from "xstate";

// NEED TO MOCK THESE
// import router from "next/router";
// import fetcher from "@/lib/fetcher";

// I USED FETCHER LIKE THIS ONLY BECAUSE I WANT IT TO BE
// EASIER TO MOCK WHEN I USE VISUALIZER
// BECUSE I WANT TO TEST FAILIURE TOO
const fetcherSignUp = () => {
  return Promise.resolve();
};
const fetcherSignIn = () => {
  return Promise.reject();
};

// THIS IS ONE OF THE ACTIONS
const navigateOfThePage = () => {
  // WE WILL CHANGE THIS ROUTE LATER

  console.log("NAVIGATING FROM THE PAGE");

  // router.push("/tryout");
};

const machineId = "auth-machine";
const key = "auth_machine_actor";

/**
 * @description finite states (not using enums because they are not supported in visualizer)
 */
export const fs = {
  // OF THE AUTH PAGE
  off_auth: "off_auth",
  //
  leaving_page: "leaving_page",

  // ------------------------------------------------
  //______ ON THE AUTH PAGE
  on_auth: "on_auth",
  // SUBSTATES (COMPOUND STATES) OF on_auth STATE
  // THIS ARE GOING TO BE TATES FOR MODES (TO SHOW signin OR signup FORM)
  signin: "signin",
  signup: "signup",
  // EXPLICIT DEFINITION OF COMPOUND STATES

  // STATES FOR INVOKATIONS
  making_request: "making_request",

  //--------------------------------------------------
  //
  //
  idle: "idle",
}; /* as const */

/**
 * @description EVENTS
 */
export const EV = {
  PAGE_VISIT: "PAGE_VISIT",
  AUTH_MODE_TOGGLE: "AUTH_MODE_TOGGLE",
  BACK_TO_OFF_PAGE: "BACK_TO_OFF_PAGE",
  MAKE_SIGNUP_REQUEST: "MAKE_SIGNUP_REQUEST",
  MAKE_SIGNIN_REQUEST: "MAKE_SIGNIN_REQUEST",
}; /* as const */

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
}; /* as const */

/**
 *
 * @param machineId
 * @param states
 * @returns string
 * @description used in case of compound state, when you want to build a target
 */
const buildTarget = (machineId, ...states) => {
  const dot = ".";
  const id = "#" + machineId;
  //
  return id + states.map((state) => dot + state).join();
};

// -----------------  MACHINE --------------------

const authPageMachine = createMachine(
  /* <
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
> */ {
    id: machineId,
    key,
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
                    /* target:
                      hashedId + dot + fs["on_auth"] + dot + fs["signup.idle"], */
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
                entry: [ac.performDisableForms],
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
                    // actions:
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
                entry: [ac.performDisableForms],

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
                    // actions
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
