import { collection, doc, DocumentReference, getDocs, QuerySnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { Board, Game } from "../../models";
import { firestoreConverter } from "./firebaseConfig";

const boardConverter = firestoreConverter<Board>();
const BOARD_PATH = "boards";
const BOARD_DOC_1 = "player_1";
const BOARD_DOC_2 = "player_2";
const boardCollection = (gameRef: DocumentReference<Game>) => collection(gameRef, BOARD_PATH).withConverter(boardConverter);

export async function createBoardsForGame(gameRef: DocumentReference<Game>): Promise<QuerySnapshot<Board>> {
  const boardCol = boardCollection(gameRef);
  const board1Doc = doc(boardCol, BOARD_DOC_1);
  const board1: Board = {
    createdAt: serverTimestamp(),
    emojiGrid: [],
    gameId: gameRef.id,
    gameDocRef: gameRef,
    id: BOARD_DOC_1,
    updatedAt: serverTimestamp(),
    wordGrid: [],
  };

  const board2Doc = doc(boardCol, BOARD_DOC_2);
  const board2: Board = {
    createdAt: serverTimestamp(),
    emojiGrid: [],
    gameId: gameRef.id,
    gameDocRef: gameRef,
    id: BOARD_DOC_2,
    updatedAt: serverTimestamp(),
    wordGrid: [],
  };

  const promises = [
    setDoc(board1Doc, board1),
    setDoc(board2Doc, board2),
  ];

  await Promise.all(promises);

  return getBoardCollection(gameRef);
}

export function getBoardCollection(gameRef: DocumentReference<Game>): Promise<QuerySnapshot<Board>> {
  const boardCol = boardCollection(gameRef);
  return getDocs(boardCol);
}
