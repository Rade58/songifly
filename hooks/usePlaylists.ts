import useSWR from "swr";
import fetcher from "@/lib/fetcher/my_fetcher";

import type { Data } from "@/pages/api/playlists";

const usePlaylists = () => {
  const { data, error } = useSWR<Data>("/playlists", fetcher);

  return {
    isLoading: !data && !error,
    playlists: data || [],
    error,
  };
};

export default usePlaylists;
