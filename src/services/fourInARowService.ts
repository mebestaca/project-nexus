import { db } from "@/firebase/config";
import { Board, FourInARowGame, Player } from "@/types/fourinarow";
import { flattenBoard } from "@/utils/fourInARowWinner";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";

export async function createFourInARowGame(
    gameName: string, 
    host: {
        uid: string;
        name: string;
    }
) {
  const board: Board = Array.from({ length: 6 }, () => Array(7).fill(""));

  return await addDoc(collection(db, "games"), {
    gameType: "connectfour",
    gameName,
    host,
    guest: null,
    status: "waiting",
    board: flattenBoard(board),
    turn: "R",
    winner: "",
    score: {
      player1: 0,
      player2: 0,
    },
  });
}

export async function joinFourInARowGame(
    gameId: string, 
    guest: {
        uid: string;
        name: string;
    }
) {
  const gameRef = doc(db, "games", gameId);

  await updateDoc(gameRef, {
    guest,
    status: "playing",
  });
}

export async function updateBoard(
  gameId: string,
  board: Board,
  turn: Player,
  winner: Player | "draw" | "",
  score: {
    player1: number;
    player2: number;
  },
) {
  const gameRef = doc(db, "games", gameId);

  await updateDoc(gameRef, {
    board: flattenBoard(board),
    turn,
    winner,
    score,
  });
}

export async function resetBoard(
    gameId: string,
    nextTurn: Player
) {
  const board: Board = Array.from({ length: 6 }, () => Array(7).fill(""));

  const gameRef = doc(db, "games", gameId);

  await updateDoc(gameRef, {
    board: flattenBoard(board),
    turn: nextTurn,
    winner: "",
  });
}

export async function resetMatch(gameId: string) {
  const board: Board = Array.from({ length: 6 }, () => Array(7).fill(""));

  const gameRef = doc(db, "games", gameId);

  await updateDoc(gameRef, {
    board: flattenBoard(board),
    turn: "R",
    winner: "",
    score: {
      player1: 0,
      player2: 0,
    },
  });
}

export async function finishGame(gameId: string) {
  const gameRef = doc(db, "games", gameId);

  await updateDoc(gameRef, {
    status: "finished",
  });
}

export function subscribeToGame(
  gameId: string,
  callback: (game: FourInARowGame) => void,
) {
  const gameRef = doc(db, "games", gameId);

  return onSnapshot(gameRef, (snapshot) => {
    const game = snapshot.data() as FourInARowGame;

    if (!game) return;

    callback(game);
  });
}

export async function getGame(gameId: string) {
  const gameRef = doc(db, "games", gameId);

  const snapshot = await getDoc(gameRef);

  return snapshot.data() as FourInARowGame;
}

export async function leaveGame(gameId: string) {
    const gameRef = doc(db, "games", gameId);

    await updateDoc(gameRef, {
        status: "left",
    });
}
