import { FieldValue, Timestamp } from "firebase/firestore";
import { DocumentBase } from ".";

export interface Game extends DocumentBase {
  player1Name: string;
  player2Name?: string;
  isLobbyFull: boolean;
  player1Ready: boolean;
  player2Ready: boolean;
  gameStatus: GameStatus;
  gameStartTime?: Timestamp | FieldValue;
  gameFinishedTime?: Timestamp | FieldValue;
  gameAnswer: string;
  winnerName?: string | null;
}

export type GameStatus = "pregame" | "ready" | "inprogress" | "finished";
