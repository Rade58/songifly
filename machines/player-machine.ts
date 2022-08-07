import { createMachine, assign, interpret } from "xstate";
import router from "next/router";

import type { Song } from "@prisma/client";

type SongType = Song;

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

const navigateOfThePage = () => {
  router.push("/");
};

// MACHINE ID AND (key IS MARKING MACHINE AS AN ACTOR)
// (TODO I GOT TO RENEW MY KNOLEDGE ON ACTOR MODEL)

const machineId = "player-machine";
const key = "player_machine_actor";
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
/**
 * @description finite states (not using enums because they are not supported in visualizer)
 */
export const fs = {
  // OF THE AUTH PAGE
  non_idle: "non_idle",
  idle: "idle",
} as const;

//
/**
 * @description EVENTS
 */
export const EV = {
  GIVE_ACTIVE_SONGS: "GIVE_ACTIVE_SONGS",
  GIVE_SINGLE_ACTIVE_SONG: "GIVE_SINGLE_ACTIVE_SONG",
} as const;

/**
 * @description actions
 */
const ac = {
  resetContext: "resetContext",
  removeActiveSongs: "removeActiveSongs",
  removeSingleActiveSong: "removeSingleActiveSong",
  //
  setSingleActiveSong: "setSingleActiveSong",
  setActiveSongs: "setActiveSongs",
} as const;

// --------------------------------------------------
// --------------------------------------------------
// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  // THIS IS GOING TO BE CURRENT PLAYLIS I THINK (I DON'T KNOW HOW WOULD THIS WORK
  // MAYBE IF A USER VISITS PLAYLIST PAGE, LIST OF ACTIVE SONGS SHOULD
  // BE LOADED INTO THIS CONTEXT PROPERTY)
  activeSongs: SongType[];
  // SONG THAT WE ARE CURRENTLY USING WITH OUR PLAYER
  activeSingleSong: SongType | null;
}

export type machineEventsGenericType =
  | {
      type: typeof EV.GIVE_ACTIVE_SONGS;
      payload: {
        songs: SongType[];
      };
    }
  | {
      type: typeof EV.GIVE_SINGLE_ACTIVE_SONG;
      payload: {
        song: SongType;
      };
    };

export type machineFiniteStatesGenericType =
  | {
      value: typeof fs.idle;
      context: MachineContextGenericI;
    }
  | {
      value: typeof fs.non_idle;
      context: MachineContextGenericI;
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
    initial: fs.idle,
    context: {
      activeSongs: [],
      activeSingleSong: null,
    },
    // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER
    // YOU CAN DEFINE TRANSITION HERE TOO-----
    // on: {
    // I THINK THIS EVENT I'M NOT GOING TO USE AT ALL
    // THIS IS MY TRANSITION, NO MATTER IN WHICH STATE YOUR MACHINE IS
    // THIS TRANSITION WILL HAPPEN ON THIS EVENT
    // [EV.BACK_TO_OFF_PAGE]: {
    // target: fs.off_auth,
    // },
    // },
    // -------------------------------------------------------------------
    states: {
      [fs.idle]: {
        on: {
          [EV.GIVE_ACTIVE_SONGS]: {
            actions: [ac.setActiveSongs],
          },
          [EV.GIVE_SINGLE_ACTIVE_SONG]: {
            actions: [ac.setSingleActiveSong],
          },
        },
      },
      [fs.non_idle]: {},
    },
  },
  {
    actions: {
      [ac.resetContext]: assign((_, __) => {
        return {
          activeSingleSong: null,
          activeSongs: [],
        };
      }),
      [ac.removeActiveSongs]: assign((_, __) => {
        return {
          activeSongs: [],
        };
      }),
      [ac.removeSingleActiveSong]: assign((_, __) => {
        return {
          activeSingleSong: null,
        };
      }),
      [ac.setActiveSongs]: assign((_, ev) => {
        if (ev.type === "GIVE_ACTIVE_SONGS") {
          return {
            activeSongs: ev.payload.songs,
          };
        } else {
          return {};
        }
      }),
      [ac.setSingleActiveSong]: assign((_, ev) => {
        if (ev.type === "GIVE_SINGLE_ACTIVE_SONG") {
          return {
            activeSingleSong: ev.payload.song,
          };
        } else {
          return {};
        }
      }),
    },
  }
);

const playerActor = interpret(authPageMachine);

playerActor.onTransition((state, event) => {
  console.log("FROM on TRANSITION");
  console.log({ authMachineCurrentState: state.value });

  console.log({ activeSongs: state.context.activeSongs });
  console.log({ activeSingleSong: state.context.activeSingleSong });
});

export default playerActor;
