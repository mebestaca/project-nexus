export type Player = "X" | "O";

export type Cell = Player | "";

export type Board = Cell[];

export interface Game {
    board: Board;
    turn: Player;
    playerX: string;
    playerO: string | null;
    winner: Player | "" | "draw";
}