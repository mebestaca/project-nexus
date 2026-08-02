import { useState } from "react";
import { RPSChoice, RPSResult, RPSScore } from "@/types/rps";
import { getWinner } from "@/utils/rpsWinner";

export function useRPS() {

  const [playerChoice, setPlayerChoice] = useState<RPSChoice | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<RPSChoice | null>(null);
  const [result, setResult] = useState<RPSResult>("");
  const [waiting, setWaiting] = useState(false);
  const [score, setScore] = useState<RPSScore>({
      player1: 0,
      player2: 0,
    });

  function choose(choice: RPSChoice) {

    if (waiting) return;

    setPlayerChoice(choice);

    setWaiting(true);

  }


  function opponentPlayed(choice: RPSChoice) {

    setOpponentChoice(choice);

    if (!playerChoice) return;

    const winner =
      getWinner(
        playerChoice,
        choice
      );

    setResult(winner);

    setWaiting(false);

    if (winner === "player1") {

      setScore((old) => ({
        ...old,
        player1: old.player1 + 1,
      }));

    }

    if (winner === "player2") {

      setScore((old) => ({
        ...old,
        player2: old.player2 + 1,
      }));

    }

  }

  function nextRound() {

    setPlayerChoice(null);

    setOpponentChoice(null);

    setResult("");

    setWaiting(false);

  }

  return {

    playerChoice,
    opponentChoice,
    result,
    waiting,
    score,
    choose,
    opponentPlayed,
    nextRound,

  };

}