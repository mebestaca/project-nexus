export interface Ball {
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
}

export interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Score {
  player1: number;
  player2: number;
}

export interface PongGameState {
  ball: Ball;
  player1Paddle: Paddle;
  player2Paddle: Paddle;
  score: Score;
  player1Id: string;
  player2Id: string;
}
