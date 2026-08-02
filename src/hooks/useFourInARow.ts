import { useAuth } from "@/context/AuthContext";
import {
  resetBoard as resetBoardService,
  resetMatch as resetMatchService,
  subscribeToGame,
  updateBoard,
  leaveGame
} from "@/services/fourInARowService";
import { Board, FourInARowGame, Player } from "@/types/fourinarow";
import { checkWinner, unflattenBoard } from "@/utils/fourInARowWinner";
import { useEffect, useState } from "react";
import { router } from "expo-router";

const EMPTY_BOARD: Board = Array.from({ length: 6 }, () => Array(7).fill(""));

export function useFourInARow(gameId: string) {
  const { user } = useAuth();
  const [game, setGame] = useState<FourInARowGame | null>(null);

  useEffect(() => {
    if (!gameId) return;
    const unsubscribe = subscribeToGame(gameId, (g) => {

        if (g.status === "left") {
            router.replace("/lobby");
            return;
        }
        setGame(g);
    });

    return unsubscribe;
  }, [gameId]);

  const isHost = !!game && !!user && game.host.uid === user.uid;
  const mySymbol: Player = isHost ? "R" : "Y";

  const board: Board = game ? unflattenBoard(game.board as any) : EMPTY_BOARD;
  const turn = game?.turn ?? "R";
  const winner = game?.winner ?? "";
  const score = game?.score ?? { player1: 0, player2: 0 };
  const player1Name = game?.host.name ?? "Player 1";
  const player2Name = game?.guest?.name ?? "Waiting...";

  async function dropPiece(column: number) {
    if (!game || !gameId) return;
    if (winner) return;
    if (turn !== mySymbol) return;

    const newBoard = board.map((row) => [...row]);

    let targetRow = -1;
    for (let row = 5; row >= 0; row--) {
      if (newBoard[row][column] === "") {
        targetRow = row;
        break;
      }
    }
    if (targetRow === -1) return;

    newBoard[targetRow][column] = mySymbol;

    const result = checkWinner(newBoard);
    const nextTurn: Player = mySymbol === "R" ? "Y" : "R";

    const newScore = { ...score };
    if (result === "R") newScore.player1 += 1;
    if (result === "Y") newScore.player2 += 1;

    await updateBoard(
      gameId,
      newBoard,
      result ? turn : nextTurn,
      result === "draw" ? "draw" : (result ?? ""),
      newScore,
    );
  }

  async function resetBoard() {
    if (!game || !gameId) return;

    let nextTurn: Player;

    if (game.winner === "R") {
        nextTurn = "Y";
      } else if (game.winner === "Y") {
        nextTurn = "R";
      } else {
        nextTurn = "R";
      }
    await resetBoardService(gameId, nextTurn);
  }

  async function resetMatch() {
    if (!gameId) return;
    await resetMatchService(gameId);
  }

  async function handleLeaveGame() {
    if (!gameId) return;

    await leaveGame(gameId);
  }

  return { 
    board, 
    turn, 
    winner, 
    score,
    player1Name,
    player2Name,
    dropPiece, 
    resetBoard, 
    resetMatch,
    leaveGame: handleLeaveGame
  };
}

  
