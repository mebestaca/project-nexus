import { addDoc, collection, doc, onSnapshot, updateDoc} from "firebase/firestore";
import { db } from "@/firebase/config";
  
export async function createGame(playerId: string) {
    const game = await addDoc(
      collection(db, "games"),
      {
        board: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        turn: "X",
        playerX: playerId,
        playerO: null,
        winner: ""
      }
    );

    return game.id;
  }

export function subscribeToGame(gameId: string, callback: (game: any) => void) {
  const gameRef =
  doc(db, "games", gameId);

  return onSnapshot(
    gameRef,
    (snapshot) => {

      callback(
        snapshot.data()
      );

    }
  );
}

export async function updateGame(gameId: string, data: any) {
    const gameRef =
        doc(db,"games",gameId);

    await updateDoc(gameRef, data);
}

  