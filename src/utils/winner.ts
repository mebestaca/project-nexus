import { Board, Player } from "../types/game";

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

export function checkWinner(board: Board): Player | "draw" | null {
    for (const [a, b, c] of wins) {
        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return board[a] as Player;
        }
    }

    if (!board.includes("")) {
        return "draw";
    }
    
    return null;
}