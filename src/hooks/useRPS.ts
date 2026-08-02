import { useAuth } from "@/context/AuthContext";
import {
  nextRound as nextRoundService,
  submitChoice,
  subscribeToGame,
  updateRound,
} from "@/services/rpsService";
import { RPSChoice, RPSGame, RPSResult } from "@/types/rps";
import { getWinner } from "@/utils/rpsWinner";
import { useEffect, useState } from "react";

export function useRPS(gameId: string) {
  const { user } = useAuth();
  const [game, setGame] = useState<RPSGame | null>(null);

  useEffect(() => {
    if (!gameId) return;
    const unsubscribe = subscribeToGame(gameId, (g) => setGame(g));
    return unsubscribe;
  }, [gameId]);

  const isPlayer1 = !!game && !!user && game.host === user.uid;

  useEffect(() => {
    if (!game || !isPlayer1) return;

    const { player1Choice, player2Choice, winner } = game.currentRound;

    if (player1Choice && player2Choice && !winner) {
      const result = getWinner(player1Choice, player2Choice);
      const player1Score = game.score.player1 + (result === "player1" ? 1 : 0);
      const player2Score = game.score.player2 + (result === "player2" ? 1 : 0);
      updateRound(gameId, result, player1Score, player2Score);
    }
  }, [game, isPlayer1, gameId]);

  const playerChoice = game
    ? isPlayer1
      ? game.currentRound.player1Choice
      : game.currentRound.player2Choice
    : null;

  const opponentChoice = game
    ? isPlayer1
      ? game.currentRound.player2Choice
      : game.currentRound.player1Choice
    : null;

  const rawResult = game?.currentRound.winner ?? "";
  const result: RPSResult =
    rawResult === "" || rawResult === "draw"
      ? rawResult
      : isPlayer1
        ? rawResult
        : rawResult === "player1"
          ? "player2"
          : "player1";

  const score = game
    ? isPlayer1
      ? { player1: game.score.player1, player2: game.score.player2 }
      : { player1: game.score.player2, player2: game.score.player1 }
    : { player1: 0, player2: 0 };

  const waiting = !!playerChoice && !opponentChoice;

  async function selectChoice(choice: RPSChoice) {
    if (!gameId || !game) return;
    await submitChoice(gameId, isPlayer1 ? "player1" : "player2", choice);
  }

  async function handleNextRound() {
    if (!gameId || !game) return;
    await nextRoundService(gameId, game.round + 1);
  }

  return {
    playerChoice,
    opponentChoice,
    score,
    result,
    waiting,
    selectChoice,
    nextRound: handleNextRound,
  };
}
