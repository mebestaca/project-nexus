export interface Room {
  lobbyId: string;
  gameType: GameType;
  gameId: string;
  isHost: string;
  playerId: string;
  playerName: string;
  name: string;
  host: string;
  players: number;
  maxPlayers: number;
}

type GameType = "tictactoe" | "pong" | "spaceshooter";
