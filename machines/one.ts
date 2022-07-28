import { createMachine, assign, interpret } from "xstate";

/**
 * @description finite states enum
 */
export enum fse {
  idle = "idle",
  non_idle = "non_idle",
}

/**
 * @description EVENTS ENUM
 */
export enum EE {
  PLACEHOLDING_ONE = "PLACEHOLDING_ONE",
  PLACEHOLDING_TWO = "PLACEHOLDING_TWO",
  // events not depending on finite state
  CHECK_CURRENT_DARK_MODE = "CHECK_CURRENT_DARK_MODE",
  CLICK = "CLICK",
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
    }
  | {
      type: EE.CLICK;
      payload: {
        placeholder: string;
      };
    };

export type machineFiniteStatesGenericType =
  | {
      value: fse.idle;
      context: MachineContextGenericI;
    }
  | {
      value: fse.non_idle;
      context: MachineContextGenericI;
    };

// -----------------  MACHINE --------------------

const mainMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  context: { isDarkMode: false, random: 2 },
  initial: "idle",
  id: "main_machine",
  on: {
    CHECK_CURRENT_DARK_MODE: {
      actions: assign((ctx, event) => {
        const { isDark } = event.payload;

        return {
          isDarkMode: isDark,
        };
      }),
    },
  },
  states: {
    idle: {
      on: {
        [EE.CLICK]: {},
      },
    },
    non_idle: {},
  },
});

export const mainService = interpret(mainMachine);

mainService.onTransition((state, event) => {
  //
  console.log({ isDarkMode: state.context.isDarkMode });
  console.log("TRANSITION");
});
