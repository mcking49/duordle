import { DocumentReference } from "firebase/firestore";
import { DocumentBase, EmojiTile, Game } from ".";

export interface Board extends DocumentBase {
  emojiGrid: EmojiTile[][];
  gameId: string;
  gameDocRef: DocumentReference<Game>;
  wordGrid: string[][];
}
