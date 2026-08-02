import { RPSChoice, RPSResult } from "@/types/rps";

export function getWinner(
    player1: RPSChoice,
    player2: RPSChoice,
): RPSResult {

    if (player1 === player2) {
        return "draw";
    }

    if (
        (player1 === "rock" && player2 === "scissors") ||
        (player1 === "paper" && player2 === "rock") ||
        (player1 === "scissors" && player2 === "paper")
    ) {
        return "player1";
    }

    return "player2";
}