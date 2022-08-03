import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useCurrentUser = () => {
  // FIRST ARGUMENT IS KEY FOR LOCAL STORAGE
  // ALSO FIRST ARGUMENT IS GOING TO BE PASSED AS A FIRST ARGUMENT
  // WHEN CALLING FETCHE

  // SO WE SHOULD NAME OUR KEY TO BE ACTUAL PATH
  // WHEE WE SEND OUR REQUEST ,
  // ** BECAUSE WE BUILD FETCHER THAT HIS FIRST ARGUMENT IS
  // ROUTE WHERRE WE SEND REQUEST **

  // THIS IS ALSO MAKE EASIER INSPECTION OF LOCAL STORAGE
  // WHEN WE LOOK TO LOCAL STORAGE WE

  const { data, error } = useSWR("/current-user", fetcher);

  return {
    isLoading: !data && !error,
    error,
    user: data,
  };
};

export default useCurrentUser;
