import { createMachine, assign, interpret } from "xstate";

/**
 * @description finite states
 */
export const fs = {
  // OF THE AUTH PAGE
  off_auth: "off_auth",
  // ON THE AUTH PAGE
  on_auth: "on_auth",
  // SUBSTATES (COMPOUND STATES) OF on_auth STATE
  signin: "signin",
  signout: "signout",
  // EXPLICIT DEFINITION OF COMPOUND STATES
  "on_auth.signin": "on_auth.signin",
  "on_auth.signout": "on_auth.signout",
}; /* as const */

/**
 * @description EVENTS
 */
export const EV = {
  PAGE_VISIT: "PAGE_VISIT",
  AUTH_MODE_TOGGLE: "AUTH_MODE_TOGGLE",
  BACK_TO_OFF_PAGE: "BACK_TO_OFF_PAGE",
}; /* as const */

// -----------------  MACHINE --------------------

const authPageMachine = createMachine({
  key: "auth",
  initial: fs.off_auth,
  context: {
    random: 2,
  },

  on: {
    [EV.BACK_TO_OFF_PAGE]: {
      target: fs.off_auth,
    },
  },
  // -------------------------------------------------------------------
  states: {
    [fs.off_auth]: {
      on: {
        [EV.PAGE_VISIT]: {
          target: "on_auth.signin",
        },
      },
    },
    [fs.on_auth]: {
      states: {
        [fs.signin]: {
          on: {
            [EV.AUTH_MODE_TOGGLE]: {
              target: fs.signout,
            },
          },
        },
        [fs.signout]: {
          on: {
            [EV.AUTH_MODE_TOGGLE]: {
              target: fs.signin,
            },
          },
        },
      },
    },
  },
});
