export interface Room {
  lobbyId: string;
  gameType: GameType;
  gameId: string;
  name: string;
  host: string;
  status: "waiting" | "started";
  players: Player[];
  maxPlayers: number;
}

export interface Player {
  id: string;
  name: string;
  ready: boolean;
  isHost: boolean;
}

export const GAME_TYPE_LABELS: Record<GameType, string> = {
  tictactoe: "Tic-Tac-Toe",
  rockpaperscissors: "Rock Paper Scissors",
  connectfour: "Connect Four",
};

export type GameType = "tictactoe" | "rockpaperscissors" | "connectfour";
