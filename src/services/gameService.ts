import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export async function createGame(playerXId: string, playerOId: string) {
  const game = await addDoc(collection(db, "games"), {
    board: ["", "", "", "", "", "", "", "", ""],
    turn: "X",
    playerX: playerXId,
    playerO: playerOId,
    winner: "",
    score: {
      playerX: 0,
      playerO: 0,
    },
  });

  return game.id;
}

export function subscribeToGame(gameId: string, callback: (game: any) => void) {
  const gameRef = doc(db, "games", gameId);

  return onSnapshot(gameRef, (snapshot) => {
    callback(snapshot.data());
  });
}

export async function updateGame(gameId: string, data: any) {
  const gameRef = doc(db, "games", gameId);

  await updateDoc(gameRef, data);
}
