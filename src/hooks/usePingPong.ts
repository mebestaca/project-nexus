import { useEffect, useState } from "react";

import { Ball, Paddle, Score} from "@/types/pingpong";
import { moveBall } from "@/utils/physics";
import { paddleCollision, wallCollision} from "@/utils/collision";

const TABLE_WIDTH = 350;
const TABLE_HEIGHT = 500;

export function usePingPong() {
  const [ball, setBall] = useState<Ball>({
    x: 170,
    y: 240,
    size: 15,
    velocityX: 4,
    velocityY: 4,
  });

  const [player1Paddle, setPlayer1Paddle] =
    useState<Paddle>({
      x: 140,
      y: 460,
      width: 70,
      height: 10,
    });

  const [player2Paddle, setPlayer2Paddle] =
    useState<Paddle>({
      x: 140,
      y: 30,
      width: 70,
      height: 10,
    });

  const [score, setScore] =
    useState<Score>({
      player1: 0,
      player2: 0,
    });

  function resetBall(direction: "up" | "down") {

    setBall({
      x: 170,
      y: 240,
      size: 15,
      
      velocityX:
        Math.random() > 0.5 ? 4 : -4,

      velocityY:
        direction === "up"
            ? -4
            : 4,
    });

  }

  useEffect(() => {
    const interval =
      setInterval(() => {

        setBall((current) => {

          let newBall =
            moveBall(current);

          if (
            wallCollision(
              newBall,
              TABLE_WIDTH
            )
          ) {

            newBall.velocityX =
              -newBall.velocityX;

          }

          if (
            paddleCollision(
              newBall,
              player1Paddle
            )
          ) {

            newBall.y =
            player1Paddle.y - newBall.size;
         
            newBall.velocityY =
            -Math.abs(newBall.velocityY);

          }

          if (
            paddleCollision(
              newBall,
              player2Paddle
            )
          ) {

            newBall.y =
            player2Paddle.y +
            player2Paddle.height;
         
            newBall.velocityY =
            Math.abs(newBall.velocityY);

          }

          if (
            newBall.y <= 0
          ) {

            setScore((old) => ({
              ...old,
              player1:
                old.player1 + 1,
            }));

            resetBall("down");

            return {
                x:170,
                y:240,
                size:15,
                velocityX:4,
                velocityY:4,
            };

          }

          if (
            newBall.y >= TABLE_HEIGHT
          ) {

            setScore((old) => ({
              ...old,
              player2:
                old.player2 + 1,
            }));

            resetBall("up");
            
            return {
                x:170,
                y:240,
                size:15,
                velocityX:4,
                velocityY:4,
            };
            
          }

          return newBall;

        });
      }, 16);

    return () =>
      clearInterval(interval);
  }, [
    player1Paddle,
    player2Paddle,
  ]);

  function movePlayer1(
    x:number
  ) {

    setPlayer1Paddle((old) => ({

      ...old,

      x:
        Math.max(
          0,
          Math.min(
            x,
            TABLE_WIDTH - old.width
          )
        ),

    }));

  }

  function movePlayer2(
    x:number
  ) {

    setPlayer2Paddle((old) => ({

      ...old,
      x:
        Math.max(
          0,
          Math.min(
            x,
            TABLE_WIDTH - old.width
          )
        ),
    }));

  }

  return {
    ball,
    player1Paddle,
    player2Paddle,
    score,
    movePlayer1,
    movePlayer2,
  };
}