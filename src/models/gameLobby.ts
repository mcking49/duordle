import { DocumentReference } from "firebase/firestore";
import { DocumentBase, Game } from ".";

export interface GameLobby extends DocumentBase {
  gameDocRef: DocumentReference<Game>;
  gameId: string;
  lobbyOpen: boolean;
}
