export interface Room {
  lobbyId: string;
  gameType: GameType;
  gameId: string;
  isHost: string;
  playerId: string;
  playerName: string;
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
}

export type GameType = "tictactoe" | "rockpaperscissors" | "connectfour";
