import { db } from "@/firebase/config";
import { PongGameState } from "@/types/pingpong";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export async function createPongGame(player1Id: string, player2Id: string) {
  const game = await addDoc(collection(db, "pongGames"), {
    ball: { x: 170, y: 240, size: 15, velocityX: 4, velocityY: 4 },
    player1Paddle: { x: 140, y: 460, width: 70, height: 10 },
    player2Paddle: { x: 140, y: 30, width: 70, height: 10 },
    score: { player1: 0, player2: 0 },
    player1Id,
    player2Id,
  });

  return game.id;
}

export function subscribeToPongGame(
  gameId: string,
  callback: (game: PongGameState) => void,
) {
  const gameRef = doc(db, "pongGames", gameId);
  return onSnapshot(gameRef, (snapshot) => {
    callback(snapshot.data() as PongGameState);
  });
}

export async function updatePongGame(
  gameId: string,
  data: Partial<PongGameState>,
) {
  const gameRef = doc(db, "pongGames", gameId);
  await updateDoc(gameRef, data);
}

export async function joinPingPongGame(gameId: string, playerId: string) {
  const gameRef = doc(db, "pingpongGames", gameId);

  await updateDoc(gameRef, {
    player2: playerId,
    status: "playing",
  });
}

export function listenPingPongGame(gameId: string, callback: any) {
  const gameRef = doc(db, "pingpongGames", gameId);

  return onSnapshot(gameRef, (snapshot) => {
    callback(snapshot.data());
  });
}

export async function savePingPongResult(gameId: string, data: any) {
  const gameRef = doc(db, "pingpongGames", gameId);

  await updateDoc(gameRef, data);
}
