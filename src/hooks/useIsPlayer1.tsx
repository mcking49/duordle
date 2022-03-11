import { useEffect, useState } from "react";

export const useIsPlayer1 = (gameId: string): boolean => {
  const [isPlayer1, setIsPlayer1] = useState(false);

  useEffect(() => {
    const isP1Check = localStorage.getItem(gameId);
    setIsPlayer1(isP1Check === "true");
  }, [gameId]);

  return isPlayer1;
};
