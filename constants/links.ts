import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
  MdPerson,
} from "react-icons/md";
import type { IconType } from "react-icons";

interface OtherLink {
  name: string;
  route: string;
  icon: IconType;
  isLink: boolean;
}

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

export const otherLinks: OtherLink[] = [
  {
    name: "Create Playlist",
    route: "/create-playlist",
    icon: MdPlaylistAdd,
    isLink: false,
  },
  {
    name: "Liked Songs",
    route: "/liked-songs",
    icon: MdFavorite,
    isLink: true,
  },
  {
    name: "Signup/in",
    route: "/auth",
    icon: MdPerson,
    isLink: true,
  },
];
