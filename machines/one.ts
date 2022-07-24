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
      value: fse.idle;
      context: MachineContextGenericI;
    }
  | {
      value: fse.non_idle;
      context: MachineContextGenericI;
    };

// -----------------  MACHINE --------------------

const mainMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgfTQYwAsswBiAYQAkBRMgaWzIFUAlZqgOQBVsARAQWb0AsgHkeVRKAAOAe1joALuhmZJIAB6IAjFoB0ATkNHjRgBwA2ADQgAntoBMAX2fXMMiHDVosuVIWK66BAANmBqsvJKKmqaCAC09voALLoADKnmAMwArKkA7Nn6eZn22dZ2CHn2uqaZqUlFSZmGeVp5LiDeOPhEmGC6bjhBoeFyisqqSBqICan6aXn6WXkr2ZlamUlJ5Yj2mXk1BeYF2fZJ5vrZSU6O1l2+-n2jkRMxM+umaRk5+YXFpTt4qldFoLrkttlzOZ0ksNuZnM4gA */
  createMachine<
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
      idle: {},
      non_idle: {},
    },
  });

export const mainService = interpret(mainMachine);

mainService.onTransition((state, event) => {
  //
  console.log({ isDarkMode: state.context.isDarkMode });
  console.log("TRANSITION");
});
