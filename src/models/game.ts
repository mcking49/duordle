import { DocumentReference, FieldValue, Timestamp } from "firebase/firestore";
import { DocumentBase, GameLobby } from ".";
import { Word } from "../lib/words";

export interface Game extends DocumentBase {
  player1Name: string;
  player2Name?: string;
  isLobbyFull: boolean;
  player1Ready: boolean;
  player2Ready: boolean;
  gameStatus: GameStatus;
  gameStartTime?: Timestamp | FieldValue;
  gameFinishedTime?: Timestamp | FieldValue;
  gameAnswer: Word;
  winnerName?: string | null;
  gameLobbyId: string;
  gameLobbyRef: DocumentReference<GameLobby>;
}

export type GameStatus = "pregame" | "ready" | "inprogress" | "finished";
