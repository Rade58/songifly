import { createMachine, assign, interpret } from "xstate";
import Router from "next/router";

import type { Song } from "@prisma/client";

// TODO
// REMOVE ALL SEEKING LOGIC FROM THE MACHINE IT IS NOT NECESSARY

type SongType = Song & {
  artist: {
    name: string;
    id: number;
  };
};

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
  Router.push("/");
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
  no_active_song: "no_active_song",
  idle: "idle",
} as const;

//
/**
 * @description EVENTS
 */
export const EV = {
  GIVE_SONGS: "GIVE_SONGS",
  GIVE_ACTIVE_SONG: "GIVE_ACTIVE_SONG",
  // PLAY: "PLAY",
  // PAUSE: "PAUSE",
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
  //
  TOGGLE_SHUFFLE: "TOGGLE_SHUFFLE",
  TOGGLE_REPEAT: "TOGGLE_REPEAT",
  //
  VISIT_PLAYLIST: "VISIT_PLAYLIST",
  //
  VOLUME_TO_HALF: "VOLUME_TO_HALF",
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
  //
  switchShuffle: "switchShuffle",
  switchRepeat: "switchRepeat",
  //
  setVisitedSongs: "setVisitedSongs",
  //
  compareAndSwitchSongsArrays: "compareAndSwitchSongsArrays",
  //
  setVolumeToHalf: "setVolumeToHalf",
} as const;

// --------------------------------------------------
// --------------------------------------------------
// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  // THIS IS GOING TO BE CURRENT PLAYLIS I THINK (I DON'T KNOW HOW WOULD THIS WORK
  // MAYBE IF A USER VISITS PLAYLIST PAGE, LIST OF ACTIVE SONGS SHOULD
  // BE LOADED INTO THIS CONTEXT PROPERTY)
  songs: { tracks: SongType[]; playlistId: number } | null;
  currentVisitedSongs: { tracks: SongType[]; playlistId: number } | null;
  // SONG THAT WE ARE CURRENTLY USING WITH OUR PLAYER
  // INDEX OF THE CTIVE SONG FROM THE sangs ARRAY SHOULD BE INCLUDED
  // BECAUSE OF SKIP LEFT AND SKIP RIGHT BUTTONS
  activeSong: { data: SongType; songIndex: number; playlistId: number } | null;
  //
  volume: number;
  mute: boolean;
  isPlaying: boolean;
  seekValue: number;
  //
  shuffle: boolean;
  repeat: boolean;
}

export type machineEventsGenericType =
  | {
      type: typeof EV.GIVE_SONGS;
      payload: {
        songs: { tracks: SongType[]; playlistId: number };
      };
    }
  | {
      type: typeof EV.VISIT_PLAYLIST;
      payload: {
        songs: { tracks: SongType[]; playlistId: number };
      };
    }
  | {
      type: typeof EV.GIVE_ACTIVE_SONG;
      payload: {
        song: { data: SongType; songIndex: number; playlistId: number };
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
  /*  | {
      type: typeof EV.PAUSE;
    }
  | {
      type: typeof EV.PLAY;
    } */
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
    }
  | {
      type: typeof EV.TOGGLE_REPEAT;
    }
  | {
      type: typeof EV.TOGGLE_SHUFFLE;
    }
  | {
      type: typeof EV.VOLUME_TO_HALF;
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
      songs: null,
      currentVisitedSongs: null,
      activeSong: null,
      volume: 0.5,
      mute: false,
      isPlaying: false,
      seekValue: 0,
      repeat: false,
      shuffle: false,
    },

    on: {
      [EV.GIVE_SONGS]: {
        actions: [ac.setSongs],
      },
      [EV.VISIT_PLAYLIST]: {
        actions: [ac.setVisitedSongs],
      },

      [EV.GIVE_VOLUME]: {
        actions: [ac.setVolume, ac.checkIfMuted],
      },

      [EV.MUTE]: {
        actions: [ac.setVolumeToZero, ac.checkIfMuted],
      },
      [EV.VOLUME_TO_HALF]: {
        actions: [ac.setVolumeToHalf, ac.checkIfMuted],
      },
    },

    // -------------------------------------------------------------------
    states: {
      [fs.no_active_song]: {
        on: {
          [EV.GIVE_ACTIVE_SONG]: {
            actions: [
              ac.setActiveSong,
              ac.compareAndSwitchSongsArrays,
              ac.setSeekToZero,
              ac.playSong,
            ],
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
            actions: [
              ac.setActiveSong,
              ac.compareAndSwitchSongsArrays,
              ac.setSeekToZero,
              ac.playSong,
            ],
          },

          [EV.TOGGLE_REPEAT]: {
            actions: [ac.switchRepeat],
          },
          [EV.TOGGLE_SHUFFLE]: {
            actions: [ac.switchShuffle],
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
          songs: null,
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
            mute: false,
          };
        }
      }),
      [ac.togglePlayingStatus]: assign((ctx, ev) => {
        if (ev.type === "TOGGLE_PLAY") {
          return {
            isPlaying: !ctx.isPlaying,
          };
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
        if (ctx.activeSong && ctx.songs && ctx.songs.tracks.length > 0) {
          if (ev.type === "SKIP_LEFT") {
            if (ctx.activeSong.songIndex === 0) {
              return {
                activeSong: {
                  data: ctx.songs.tracks[ctx.songs.tracks.length - 1],
                  songIndex: ctx.songs.tracks.length - 1,
                  playlistId: ctx.activeSong.playlistId,
                },
              };
            } else {
              return {
                activeSong: {
                  data: ctx.songs.tracks[ctx.activeSong.songIndex - 1],
                  songIndex: ctx.activeSong.songIndex - 1,
                  playlistId: ctx.activeSong.playlistId,
                },
              };
            }
          }

          return {};
        }

        return {};
      }),
      [ac.skipSongToTheRight]: assign((ctx, ev) => {
        if (ctx.activeSong && ctx.songs && ctx.songs.tracks.length > 0) {
          if (ev.type === "SKIP_RIGHT") {
            if (ctx.activeSong.songIndex === ctx.songs.tracks.length - 1) {
              return {
                activeSong: {
                  data: ctx.songs.tracks[0],
                  songIndex: 0,
                  playlistId: ctx.activeSong.playlistId,
                },
              };
            } else {
              return {
                activeSong: {
                  data: ctx.songs.tracks[ctx.activeSong.songIndex + 1],
                  songIndex: ctx.activeSong.songIndex + 1,
                  playlistId: ctx.activeSong.playlistId,
                },
              };
            }
          }

          return {};
        }

        return {};
      }),
      [ac.setSeekToZero]: assign((_, __) => ({ seekValue: 0 })),
      [ac.resetCurrentIndex]: assign((ctx, __) => {
        if (ctx.activeSong) {
          return {
            activeSong: {
              data: ctx.activeSong.data,
              playlistId: ctx.activeSong.playlistId,
              songIndex: 0,
            },
          };
        }

        return {};
      }),
      [ac.switchRepeat]: assign((ctx, ev) => {
        if (ev.type === "TOGGLE_REPEAT") {
          return {
            repeat: !ctx.repeat,
          };
        }

        return {};
      }),

      [ac.switchShuffle]: assign((ctx, ev) => {
        if (ev.type === "TOGGLE_SHUFFLE") {
          return {
            shuffle: !ctx.shuffle,
          };
        }

        return {};
      }),
      [ac.setVisitedSongs]: assign((_, ev) => {
        if (ev.type === "VISIT_PLAYLIST") {
          return { currentVisitedSongs: ev.payload.songs };
        }
        return {};
      }),
      [ac.compareAndSwitchSongsArrays]: assign((ctx, _) => {
        if (ctx.activeSong && ctx.currentVisitedSongs) {
          if (
            ctx.activeSong.playlistId === ctx.currentVisitedSongs.playlistId
          ) {
            return {
              songs: ctx.currentVisitedSongs,
            };
          }

          return {};
        }

        return {};
      }),
      [ac.setVolumeToHalf]: assign((_, ev) => {
        if (ev.type === "VOLUME_TO_HALF") {
          return {
            volume: 0.5,
          };
        }
        return {};
      }),
    },
  }
);

const playerActor = interpret(authPageMachine);

playerActor.onTransition((state, event) => {
  // console.log("FROM on TRANSITION");
  // console.log({ playerMachineCurrentState: state.value });

  // console.log({ loadedSongs: state.context.songs });
  // console.log({ activeSingleSong: state.context.activeSong });

  console.log({ VISITED_SONGS: state.context.currentVisitedSongs });

  console.log({ SONGZIES: state.context.songs });
});

export default playerActor;
