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
    player: number;
    ai: number;
}

export interface PingPongState {
    ball: Ball;
    playerPaddle: Paddle;
    aiPaddle: Paddle;
    score: Score;
}