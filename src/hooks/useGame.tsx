import { DocumentSnapshot } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { getGameDocRef } from "../lib/firebase/game";
import { Game } from "../models";

export type UseGame = [DocumentSnapshot<Game>?];

export const useGame = (gameId: string): UseGame => {
  const [game] = useDocument(getGameDocRef(gameId));
  return [game];
};
