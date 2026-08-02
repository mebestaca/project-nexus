export type Player = "R" | "Y";

export type Cell = Player | "";

export type Board = Cell[][];

export interface FourInARowGame {
    gameType: "fourinarow";
    gameName: string;
    host: string;
    guest: string | null;
    board: Board;
    turn: Player;
    winner:
        | Player
        | "draw"
        | "";
    score: {
        player1: number;
        player2: number;
    };
}