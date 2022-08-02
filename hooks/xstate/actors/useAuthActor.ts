import { useActor } from "@xstate/react";
import authPageActor from "@/machines/auth-page-machine";

const useAuthActor = () => {
  const actor = useActor(authPageActor);

  return actor;
};

export default useAuthActor;
