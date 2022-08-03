import useSWR from "swr";
import fetcher from "@/lib/fetcher/my_fetcher";

const usePlaylists = () => {
  const { data, error } = useSWR("/playlists", fetcher);

  return {
    isLoading: !data && !error,
    playlists: data || [],
    error,
  };
};

export default usePlaylists;
