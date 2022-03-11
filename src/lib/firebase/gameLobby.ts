import { collection, doc, DocumentReference, getDoc } from "firebase/firestore";
import { GameLobby } from "../../models";
import { randomId } from "../randomId";
import { firestore, firestoreConverter } from "./firebaseConfig";

const gameLobbyConverter = firestoreConverter<GameLobby>();
const GAME_LOBBY_PATH = "game_lobbies";
const gameLobbyCollection = collection(firestore, GAME_LOBBY_PATH).withConverter(gameLobbyConverter);

export async function getNewGameLobby(): Promise<DocumentReference<GameLobby>> {
  let docRef = null;

  while (!docRef) {
    const id = randomId();
    const lobbyExists = await doesGameLobbyExist(id);

    if (!lobbyExists) {
      docRef = getGameLobbbyDocRef(id);
    }
  }

  return docRef;
}

async function doesGameLobbyExist(id: string): Promise<boolean> {
  const snapshot = await getDoc(doc(gameLobbyCollection, id));
  return snapshot.exists();
}

export function getGameLobbbyDocRef(gameLobbyId: string): DocumentReference<GameLobby> {
  return doc(gameLobbyCollection, gameLobbyId);
}
