import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import type { IconType } from "react-icons";

type LinkList = { name: string; route: string; icon: IconType }[];

export const mainLinks: LinkList = [
  {
    name: "Home",
    route: "/",
    icon: MdHome,
  },
  {
    name: "Search",
    route: "/search",
    icon: MdSearch,
  },
  {
    name: "Your Library",
    route: "/library",
    icon: MdLibraryMusic,
  },
];

export const otherLinks: LinkList = [
  {
    name: "Create Playlist",
    route: "/create-playlist",
    icon: MdPlaylistAdd,
  },
  {
    name: "Liked Songs",
    route: "/liked-songs",
    icon: MdFavorite,
  },
];
