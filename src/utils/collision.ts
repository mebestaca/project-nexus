import {
    Ball,
    Paddle,
  } from "@/types/pingpong";
  
  export function paddleCollision(
    ball: Ball,
    paddle: Paddle
  ) {
  
    return (
      ball.x < paddle.x + paddle.width &&
      ball.x + ball.size > paddle.x &&
      ball.y < paddle.y + paddle.height &&
      ball.y + ball.size > paddle.y
    );
  
  }
  
  export function wallCollision(
    ball: Ball,
    width:number
  ) {
  
    return (
      ball.x <= 0 ||
      ball.x >= width - ball.size
    );
  
  }
  