import { Ball } from "@/types/pingpong";

export function moveBall(ball: Ball): Ball {

  return {
    ...ball,

    x: ball.x + ball.velocityX,

    y: ball.y + ball.velocityY,
  };

}

export function bounceHorizontal(ball: Ball): Ball {

  return {
    ...ball,

    velocityX:
      -ball.velocityX,
  };

}

export function bounceVertical(ball: Ball): Ball {

  return {
    ...ball,

    velocityY:
      -ball.velocityY,
  };

}