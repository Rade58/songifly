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
  signin: "signin",
  signout: "signout",
  // EXPLICIT DEFINITION OF COMPOUND STATES
  "on_auth.signin": "on_auth.signin",
  "on_auth.signout": "on_auth.signout",
} as const;

/**
 * @description EVENTS
 */
export const EV = {
  PAGE_VISIT: "PAGE_VISIT",
  AUTH_MODE_TOGGLE: "AUTH_MODE_TOGGLE",
  BACK_TO_OFF_PAGE: "BACK_TO_OFF_PAGE",
} as const;

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  random: number;
}

export type machineEventsGenericType =
  /* | {
      type: EE.A;
      payload: {
        placeholder: number;
      };
    } 
  |*/
  | {
      type: typeof EV.PAGE_VISIT;
    }
  | { type: typeof EV.AUTH_MODE_TOGGLE }
  | { type: typeof EV.BACK_TO_OFF_PAGE };

export type machineFiniteStatesGenericType =
  | {
      value: typeof fs.off_auth;
      context: MachineContextGenericI;
    }
  | {
      value: typeof fs.on_auth;
      context: MachineContextGenericI;
    }

  // you need to do this for compound states to have better types
  | {
      value: { [fs.on_auth]: typeof fs.signin };
      context: MachineContextGenericI;
    }
  | {
      value: { [fs.on_auth]: typeof fs.signout };
      context: MachineContextGenericI;
    };

// -----------------  MACHINE --------------------

const authPageMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  key: "auth",
  initial: fs.off_auth,
  context: {
    random: 2,
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
    },
  },
  // -------------------------------------------------------------------
  states: {
    [fs.off_auth]: {
      on: {
        [EV.PAGE_VISIT]: {
          // ADDING DOT BEFORE IT BECAUSE I SAW IT LIKE THIS
          // INSIDE DOCS
          // THIS DOESN'T WORK
          // target: `.${fs["on_auth.signin"]}`,
          // THIS WORKS:
          target: fs["on_auth.signin"],
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

export const authPageService = interpret(authPageMachine);

authPageService.onTransition((state, event) => {
  //
  // console.log({ isDarkMode: state.context.isDarkMode });
  // console.log("TRANSITION");
});
