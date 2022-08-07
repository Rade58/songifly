import { useActor } from "@xstate/react";
import playerActor from "@/machines/player-machine";

const useAuthActor = () => {
  const actor = useActor(playerActor);

  return actor;
};

export default useAuthActor;
