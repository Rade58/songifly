import { createMachine, assign, interpret } from "xstate";

import router from "next/router";

/**
 * @description finite states enum
 */
export enum fse {
  off_auth_page = "off_auth_page",
  signin = "signin",
  signout = "signout",
}

/**
 * @description EVENTS ENUM
 */
export enum EE {
  PLACEHOLDING_ONE = "PLACEHOLDING_ONE",
  PLACEHOLDING_TWO = "PLACEHOLDING_TWO",
  // events not depending on finite state
  CHECK_CURRENT_DARK_MODE = "CHECK_CURRENT_DARK_MODE",
}

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  isDarkMode: boolean;
  random: number;
}

export type machineEventsGenericType =
  | {
      type: EE.CHECK_CURRENT_DARK_MODE;
      payload: {
        isDark: boolean;
      };
    }
  | {
      type: EE.PLACEHOLDING_ONE;
      payload: {
        placeholder: number;
      };
    }
  | {
      type: EE.PLACEHOLDING_TWO;
      payload: {
        placeholder: string;
      };
    };

export type machineFiniteStatesGenericType =
  | {
      value: fse.off_auth_page;
      context: MachineContextGenericI;
    }
  | {
      value: fse.off_auth_page;
      context: MachineContextGenericI;
    };

// -----------------  MACHINE --------------------

const mainMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  id: "main_machine",
  initial: fse.signin,
  context: {
    isDarkMode: false,
    random: 2,
  },
  // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER -----
  on: {
    [EE.CHECK_CURRENT_DARK_MODE]: {
      actions: [
        assign((ctx, event) => {
          const { isDark } = event.payload;

          return {
            isDarkMode: isDark,
          };
        }),
      ],
    },
  },
  // -------------------------------------------------------------------
  states: {
    // [fse.idle]: {},
    // [fse.non_idle]: {},
  },
});

export const mainService = interpret(mainMachine);

mainService.onTransition((state, event) => {
  //
  // console.log({ isDarkMode: state.context.isDarkMode });
  // console.log("TRANSITION");
});
