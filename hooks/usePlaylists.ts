import useSWR from "swr";
import fetcher from "@/lib/fetcher/my_fetcher";

import type { Playlist } from "@prisma/client";

const usePlaylists = () => {
  const { data, error } = useSWR<Playlist[]>("/playlists", fetcher);

  return {
    isLoading: !data && !error,
    playlists: data || [],
    error,
  };
};

export default usePlaylists;
