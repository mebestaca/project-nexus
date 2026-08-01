import { useEffect, useState } from "react";
import {
  Ball,
  Paddle,
  Score,
} from "@/types/pingpong";

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

  const [player2Paddle, setplayer2Paddle] =
    useState<Paddle>({
      x: 140,
      y: 30,
      width: 70,
      height: 10,
    });

  const [score, setScore] =
    useState<Score>({
      player:0,
      ai:0,
    });

  function resetBall(){

    setBall({
      x:170,
      y:240,
      size:15,
      velocityX:4,
      velocityY:4,
    });

  }

  useEffect(()=>{
    const interval =
      setInterval(()=>{
        setBall((current)=>{
          let newX =
            current.x + current.velocityX;

          let newY =
            current.y + current.velocityY;

          let velocityX =
            current.velocityX;

          let velocityY =
            current.velocityY;

          if(
            newX <= 0 ||
            newX >= TABLE_WIDTH-current.size
          ){

            velocityX =
              -velocityX;

          }

          if(newY <= 0){

            setScore((old)=>({
              ...old,
              player1:old.player+1,
            }));

            resetBall();

          }

          if(
            newY >= TABLE_HEIGHT-current.size
          ){

            setScore((old)=>({
              ...old,
              player2:old.player+1,
            }));

            resetBall();

          }

          return {
            ...current,
            x:newX,
            y:newY,
            velocityX,
            velocityY,
          };
        });
      },16);
    return ()=>clearInterval(interval);
  },[]);

  function movePlayer(
    x:number
  ){
    setPlayer1Paddle((old)=>({

      ...old,

      x:
        Math.max(
          0,
          Math.min(
            x,
            TABLE_WIDTH-old.width
          )
        )

    }));

  }
  return {
    ball,
    player1Paddle,
    player2Paddle,
    score,
    movePlayer,
  };
}