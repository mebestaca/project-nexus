import { useAuth } from "@/context/AuthContext";
import {
  resetBoard as resetBoardService,
  resetMatch as resetMatchService,
  subscribeToGame,
  updateBoard,
} from "@/services/fourInARowService";
import { Board, FourInARowGame, Player } from "@/types/fourinarow";
import { checkWinner, unflattenBoard } from "@/utils/fourInARowWinner";
import { useEffect, useState } from "react";

const EMPTY_BOARD: Board = Array.from({ length: 6 }, () => Array(7).fill(""));

export function useFourInARow(gameId: string) {
  const { user } = useAuth();
  const [game, setGame] = useState<FourInARowGame | null>(null);

  useEffect(() => {
    if (!gameId) return;
    const unsubscribe = subscribeToGame(gameId, (g) => setGame(g));
    return unsubscribe;
  }, [gameId]);

  const isHost = !!game && !!user && game.host === user.uid;
  const mySymbol: Player = isHost ? "R" : "Y";

  const board: Board = game ? unflattenBoard(game.board as any) : EMPTY_BOARD;
  const turn = game?.turn ?? "R";
  const winner = game?.winner ?? "";
  const score = game?.score ?? { player1: 0, player2: 0 };

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
    if (!gameId) return;
    await resetBoardService(gameId);
  }

  async function resetMatch() {
    if (!gameId) return;
    await resetMatchService(gameId);
  }

  return { board, turn, winner, score, dropPiece, resetBoard, resetMatch };
}
