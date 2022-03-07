import { DocumentBase, GameStatus } from ".";

export interface GameLobby extends DocumentBase {
  lobbyId: string;
  gameStatus: GameStatus;
}
