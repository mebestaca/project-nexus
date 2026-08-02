export type RPSChoice = 
    | "rock"
    | "paper"
    | "scissors";

export type RPSResult =
    | "player1"
    | "player2"
    | "draw"
    | "";

export interface RPSScore {
    player1: number;
    player2: number;
}

export interface RPSRound {
    player1Choice: RPSChoice | null;
    player2Choice: RPSChoice | null;
    winner: RPSResult;
}

export interface RPSGame {
    id: string;
    gameName: string;
    host: string;
    guest: string | null;
    status:
        | "waiting"
        | "playing"
        | "finished";
    round: number;
    score: RPSScore;
    currentRound: RPSRound;
}