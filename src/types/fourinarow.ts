export type Player = "R" | "Y";

export type Cell = Player | "";

export type Board = Cell[][];

export interface FourInARowGame {
  id: string;
  gameName: string;
  host: string;
  guest: string | null;
  status: "waiting" | "playing" | "finished";
  board: Cell[];
  turn: Player;
  winner: Player | "draw" | "";
  score: { player1: number; player2: number };
}
