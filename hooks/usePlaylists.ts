import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const usePlaylists = () => {
  const { data, error } = useSWR("/playlists");

  return {
    isLoading: !data && !error,
    playlists: data || [],
    error,
  };
};

export default usePlaylists;
