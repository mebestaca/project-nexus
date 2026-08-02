export type Player = "R" | "Y";

export type Cell = Player | "";

export type Board = Cell[][];

export interface FourInARowGame {
  id: string;
  gameName: string;
  host: {
    uid: string;
    name: string;
  };
  guest: {
    uid: string;
    name: string;
  } | null;
  status: 
    | "waiting" 
    | "playing" 
    | "finished"
    | "left";
  board: Cell[];
  turn: Player;
  winner: Player | "draw" | "";
  score: { player1: number; player2: number };
}
