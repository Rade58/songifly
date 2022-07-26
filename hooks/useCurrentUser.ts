import useSWR from "swr";
import type { User } from "@prisma/client";
import fetcher from "@/lib/fetcher/my_fetcher";

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

  const { data, error } = useSWR<User>("/current-user", fetcher);

  return {
    isLoading: !data && !error,
    error,
    user: data,
    // MADE SOME MISTAKES (I DID THIS TO FIX THINGS QUICKLY
    // JECK API ROUTE OR FETCHER BECAUSE DATA COMES AS user.user)
    // @ts-ignore
    userData: data ? data.user : {},
  };
};

export default useCurrentUser;
