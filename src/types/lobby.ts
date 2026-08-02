export type GameType = "tictactoe" | "rockpaperscissors" | "connectfour";

export interface Lobby {
  id: string;
  lobbyName: string;
  gameType: GameType;
  host: string;
  players: number;
  maxPlayers: number;
  status: "waiting" | "playing" | "finished";
}

export interface CreateLobbyValues {
  lobbyName: string;
  gameType: GameType;
  maxPlayers: number;
}

export default function _() {
  return null;
}
