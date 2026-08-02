import { Ball, Paddle } from "@/types/pingpong";

export function paddleCollision(ball: Ball, paddle: Paddle, tolerance = 10) {
  return (
    ball.x < paddle.x + paddle.width + tolerance &&
    ball.x + ball.size > paddle.x - tolerance &&
    ball.y < paddle.y + paddle.height &&
    ball.y + ball.size > paddle.y
  );
}

export function wallCollision(ball: Ball, width: number) {
  return ball.x <= 0 || ball.x >= width - ball.size;
}
