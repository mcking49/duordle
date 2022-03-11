import { collection, doc, DocumentReference, DocumentSnapshot, getDoc, serverTimestamp, writeBatch } from "firebase/firestore";
import { Game, GameLobby } from "../../models";
import { getRandomWord } from "../words";
import { createBoardsForGame } from "./board";
import { firestore, firestoreConverter } from "./firebaseConfig";
import { getNewGameLobby } from "./gameLobby";

const gameConverter = firestoreConverter<Game>();
const GAME_PATH = "games";
const gameCollection = collection(firestore, GAME_PATH).withConverter(gameConverter);

export function getGameDocRef(gameId: string): DocumentReference<Game> {
  return doc(gameCollection, gameId);
}

function getGameSnapshot(gameRef: DocumentReference<Game>): Promise<DocumentSnapshot<Game>> {
  return getDoc(gameRef);
}

export async function getGameDataFromId(gameId: string): Promise<Game | undefined> {
  const snapshot = await getGameSnapshot(getGameDocRef(gameId));
  return snapshot.data();
}

export async function getGameDataFromRef(gameRef: DocumentReference<Game>): Promise<Game | undefined> {
  const snapshot = await getGameSnapshot(gameRef);
  return snapshot.data();
}

export async function createGame(player1Name: string): Promise<DocumentSnapshot<Game>> {
  const gameAnswer = getRandomWord();
  const newGameLobby = await getNewGameLobby();

  const newGameDoc = doc(gameCollection);

  const gameData: Game = {
    createdAt: serverTimestamp(),
    gameAnswer,
    gameLobbyId: newGameLobby.id,
    gameLobbyRef: newGameLobby,
    gameStatus: "pregame",
    id: newGameDoc.id,
    isLobbyFull: false,
    player1Name,
    player1Ready: false,
    player2Ready: false,
    updatedAt: serverTimestamp(),
  };

  const newLobbyData: GameLobby = {
    createdAt: serverTimestamp(),
    gameDocRef: newGameDoc,
    gameId: newGameDoc.id,
    id: newGameLobby.id,
    updatedAt: serverTimestamp(),
  };

  const batch = writeBatch(firestore);
  batch.set(newGameDoc, gameData);
  batch.set(newGameLobby, newLobbyData);

  await batch.commit();

  localStorage.setItem(newGameDoc.id, "true");

  createBoardsForGame(newGameDoc);

  return getGameSnapshot(newGameDoc);
}
