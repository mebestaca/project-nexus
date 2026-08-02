export type Player = "X" | "O";

export type Cell = Player | "";

export type Board = Cell[];

export interface Game {
    board: Board;
    turn: Player;
    startingPlayer: Player;
    playerX: {
        uid: string;
        name: string;
    };
    playerO: {
        uid: string;
        name: string;
    } | null;
    winner: Player | "" | "draw";
    status: "playing" | "finished" | "left";
    score: {
        playerX: number;
        playerO: number,
    };
}