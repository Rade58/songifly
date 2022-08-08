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
  no_active_song: "no_song",
  idle: "idle",
} as const;

//
/**
 * @description EVENTS
 */
export const EV = {
  GIVE_SONGS: "GIVE_SONGS",
  GIVE_ACTIVE_SONG: "GIVE_ACTIVE_SONG",
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  TOGGLE_PLAY: "TOGGLE_PLAY",
  GIVE_VOLUME: "GIVE_VOLUME",
  MUTE: "MUTE",
  //
  GIVE_SEEK_VAL: "GIVE_SEEK_VAL",
  //
  SKIP_LEFT: "SKIP_LEFT",
  SKIP_RIGHT: "SKIP_RIGHT",
  //
  CHANGE_ACTIVE_SONG: "CHANGE_ACTIVE_SONG",
} as const;

/**
 * @description actions
 */
const ac = {
  resetContext: "resetContext",
  removeSongs: "removeSongs",
  removeActiveSong: "removeActiveSong",
  //
  setActiveSong: "setActiveSong",
  setSongs: "setSongs",
  setVolume: "setVolume",
  setVolumeToZero: "setVolumeToZero",
  checkIfMuted: "checkIfMuted",
  togglePlayingStatus: "togglePlayingStatus",
  //
  playSong: "playSong",
  pauseSong: "pauseSong",
  //
  setSeekVal: "setSeekVal",
  //
  skippSongToTheLeft: "skippSongToTheLeft",
  skipSongToTheRight: "skipSongToTheRight",
  //
  setSeekToZero: "setSeekToZero",
  //
  resetCurrentIndex: "resetCurrentIndex",
} as const;

// --------------------------------------------------
// --------------------------------------------------
// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  // THIS IS GOING TO BE CURRENT PLAYLIS I THINK (I DON'T KNOW HOW WOULD THIS WORK
  // MAYBE IF A USER VISITS PLAYLIST PAGE, LIST OF ACTIVE SONGS SHOULD
  // BE LOADED INTO THIS CONTEXT PROPERTY)
  songs: SongType[];
  // SONG THAT WE ARE CURRENTLY USING WITH OUR PLAYER
  // INDEX OF THE CTIVE SONG FROM THE sangs ARRAY SHOULD BE INCLUDED
  // BECAUSE OF SKIP LEFT AND SKIP RIGHT BUTTONS
  activeSong: { data: SongType; songIndex: number } | null;
  //
  volume: number;
  mute: boolean;
  isPlaying: boolean;
  seekValue: number;
}

export type machineEventsGenericType =
  | {
      type: typeof EV.GIVE_SONGS;
      payload: {
        songs: SongType[];
      };
    }
  | {
      type: typeof EV.GIVE_ACTIVE_SONG;
      payload: {
        song: { data: SongType; songIndex: number };
      };
    }
  | {
      type: typeof EV.GIVE_VOLUME;
      payload: {
        volume: number;
      };
    }
  | {
      type: typeof EV.MUTE;
    }
  | {
      type: typeof EV.TOGGLE_PLAY;
    }
  | {
      type: typeof EV.PAUSE;
    }
  | {
      type: typeof EV.PLAY;
    }
  | {
      type: typeof EV.GIVE_SEEK_VAL;
      payload: {
        seekValue: number;
      };
    }
  | {
      type: typeof EV.SKIP_LEFT;
    }
  | {
      type: typeof EV.SKIP_RIGHT;
    };

export type machineFiniteStatesGenericType =
  | {
      value: typeof fs.idle;
      context: MachineContextGenericI;
    }
  | {
      value: typeof fs.no_active_song;
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
    initial: fs.no_active_song,
    context: {
      songs: [],
      activeSong: null,
      volume: 50,
      mute: false,
      isPlaying: false,
      seekValue: 0,
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
    on: {
      [EV.GIVE_SONGS]: {
        actions: [ac.setSongs, ac.resetCurrentIndex],
      },

      [EV.GIVE_VOLUME]: {
        actions: [ac.setVolume, ac.checkIfMuted],
      },

      [EV.MUTE]: {
        actions: [ac.setVolumeToZero, ac.checkIfMuted],
      },
    },

    // -------------------------------------------------------------------
    states: {
      [fs.no_active_song]: {
        on: {
          [EV.GIVE_ACTIVE_SONG]: {
            actions: [ac.setActiveSong, ac.setSeekToZero, ac.playSong],
            target: fs.idle,
          },
        },
      },

      [fs.idle]: {
        on: {
          [EV.TOGGLE_PLAY]: {
            actions: [ac.togglePlayingStatus],
          },
          [EV.GIVE_SEEK_VAL]: {
            actions: [ac.setSeekVal],
          },
          [EV.SKIP_LEFT]: {
            actions: [ac.skippSongToTheLeft, ac.setSeekToZero],
          },
          [EV.SKIP_RIGHT]: {
            actions: [ac.skipSongToTheRight, ac.setSeekToZero],
          },

          [EV.GIVE_ACTIVE_SONG]: {
            actions: [ac.setActiveSong, ac.setSeekToZero, ac.playSong],
          },
        },
      },
    },
  },
  {
    actions: {
      [ac.resetContext]: assign((_, __) => {
        return {
          activeSingleSong: null,
          activeSongs: [],
          volume: 50,
          isPlaying: false,
          mute: false,
        };
      }),
      [ac.removeSongs]: assign((_, __) => {
        return {
          songs: [],
        };
      }),
      [ac.removeActiveSong]: assign((_, __) => {
        return {
          activeSong: null,
        };
      }),
      [ac.setSongs]: assign((_, ev) => {
        if (ev.type === "GIVE_SONGS") {
          return {
            songs: ev.payload.songs,
          };
        } else {
          return {};
        }
      }),
      [ac.setActiveSong]: assign((_, ev) => {
        if (ev.type === "GIVE_ACTIVE_SONG") {
          return {
            activeSong: ev.payload.song,
          };
        } else {
          return {};
        }
      }),
      [ac.setVolume]: assign((_, ev) => {
        if (ev.type === "GIVE_VOLUME") {
          return {
            volume: ev.payload.volume,
          };
        } else {
          return {};
        }
      }),
      [ac.setVolumeToZero]: assign((_, ev) => {
        if (ev.type === "MUTE") {
          return {
            volume: 0,
          };
        } else {
          return {};
        }
      }),
      [ac.checkIfMuted]: assign((ctx, _) => {
        if (ctx.volume === 0) {
          return {
            mute: true,
          };
        } else {
          return {
            mute: true,
          };
        }
      }),
      [ac.togglePlayingStatus]: assign((ctx, ev) => {
        if (ev.type === "TOGGLE_PLAY") {
          return !ctx.isPlaying;
        } else {
          return {};
        }
      }),
      [ac.playSong]: assign((_, __) => ({ isPlaying: true })),
      [ac.pauseSong]: assign((_, __) => ({ isPlaying: false })),
      [ac.setSeekVal]: assign((_, ev) => {
        if (ev.type === "GIVE_SEEK_VAL") {
          return {
            seekValue: ev.payload.seekValue,
          };
        }

        return {};
      }),
      [ac.skippSongToTheLeft]: assign((ctx, ev) => {
        if (ctx.activeSong) {
          if (ev.type === "SKIP_LEFT") {
            if (ctx.activeSong.songIndex === 0) {
              return {
                activeSong: {
                  data: ctx.songs[ctx.songs.length - 1],
                  songIndex: ctx.songs.length - 1,
                },
              };
            } else {
              return {
                activeSong: {
                  data: ctx.songs[ctx.activeSong.songIndex - 1],
                  songIndex: ctx.activeSong.songIndex - 1,
                },
              };
            }
          }

          return {};
        } else {
          return {
            activeSong: {
              data: ctx.songs[ctx.songs.length - 1],
              songIndex: ctx.songs.length - 1,
            },
            isPlaying: true,
          };
        }

        return {};
      }),
      [ac.skipSongToTheRight]: assign((ctx, ev) => {
        if (ctx.activeSong) {
          if (ev.type === "SKIP_RIGHT") {
            if (ctx.activeSong.songIndex === ctx.songs.length - 1) {
              return {
                activeSong: {
                  data: ctx.songs[0],
                  songIndex: 0,
                },
              };
            } else {
              return {
                activeSong: {
                  data: ctx.songs[ctx.activeSong.songIndex + 1],
                  songIndex: ctx.activeSong.songIndex + 1,
                },
              };
            }
          }

          return {};
        } else {
          return {
            activeSong: { data: ctx.songs[0], songIndex: 0 },
            isPlaying: true,
          };
        }

        return {};
      }),
      [ac.setSeekToZero]: assign((_, __) => ({ seekValue: 0 })),
      [ac.resetCurrentIndex]: assign((ctx, __) => {
        if (ctx.activeSong) {
          return { activeSong: { data: ctx.activeSong.data, songIndex: 0 } };
        }

        return {};
      }),
    },
  }
);

const playerActor = interpret(authPageMachine);

playerActor.onTransition((state, event) => {
  console.log("FROM on TRANSITION");
  console.log({ playerMachineCurrentState: state.value });

  console.log({ loadedSongs: state.context.songs });
  console.log({ activeSingleSong: state.context.activeSong });
});

export default playerActor;
