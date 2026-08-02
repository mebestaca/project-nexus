import {
  subscribeToPongGame,
  updatePongGame,
} from "@/services/pingPongService";
import { Ball, Paddle, Score } from "@/types/pingpong";
import { paddleCollision, wallCollision } from "@/utils/collision";
import { moveBall } from "@/utils/physics";
import { useEffect, useRef, useState } from "react";

const TABLE_WIDTH = 350;
const TABLE_HEIGHT = 500;

export function usePingPong(gameId: string, isHost: boolean) {
  const [ball, setBall] = useState<Ball>({
    x: 170,
    y: 240,
    size: 15,
    velocityX: 4,
    velocityY: 4,
  });
  const [player1Paddle, setPlayer1Paddle] = useState<Paddle>({
    x: 140,
    y: 460,
    width: 70,
    height: 10,
  });
  const [player2Paddle, setPlayer2Paddle] = useState<Paddle>({
    x: 140,
    y: 30,
    width: 70,
    height: 10,
  });
  const [score, setScore] = useState<Score>({ player1: 0, player2: 0 });

  const player1PaddleRef = useRef(player1Paddle);
  const player2PaddleRef = useRef(player2Paddle);
  player1PaddleRef.current = player1Paddle;
  player2PaddleRef.current = player2Paddle;

  // Everyone listens for state — this is how the joiner's screen updates,
  // and how the host stays in sync with the other player's paddle.
  useEffect(() => {
    if (!gameId) return;

    const unsubscribe = subscribeToPongGame(gameId, (game) => {
      if (!game) return;

      if (!isHost) {
        setBall(game.ball);
        setScore(game.score);
      }

      // Whichever paddle isn't "mine," always trust Firestore for it
      if (isHost) {
        setPlayer2Paddle(game.player2Paddle);
      } else {
        setPlayer1Paddle(game.player1Paddle);
      }
    });

    return unsubscribe;
  }, [gameId, isHost]);

  function resetBall(direction: "up" | "down"): Ball {
    return {
      x: 170,
      y: 240,
      size: 15,
      velocityX: Math.random() > 0.5 ? 4 : -4,
      velocityY: direction === "up" ? -4 : 4,
    };
  }

  // Only the host simulates physics — the joiner just renders what Firestore says.
  useEffect(() => {
    if (!isHost || !gameId) return;

    const interval = setInterval(() => {
      setBall((current) => {
        let newBall = moveBall(current);

        if (wallCollision(newBall, TABLE_WIDTH)) {
          newBall.velocityX = -newBall.velocityX;
        }

        if (paddleCollision(newBall, player1PaddleRef.current)) {
          newBall.y = player1PaddleRef.current.y - newBall.size;
          newBall.velocityY = -Math.abs(newBall.velocityY);
        }

        if (paddleCollision(newBall, player2PaddleRef.current)) {
          newBall.y =
            player2PaddleRef.current.y + player2PaddleRef.current.height;
          newBall.velocityY = Math.abs(newBall.velocityY);
        }

        let finalBall = newBall;
        let newScore: Score | null = null;

        if (newBall.y <= 0) {
          newScore = { ...score, player1: score.player1 + 1 };
          finalBall = resetBall("down");
        } else if (newBall.y >= TABLE_HEIGHT) {
          newScore = { ...score, player2: score.player2 + 1 };
          finalBall = resetBall("up");
        }

        if (newScore) {
          setScore(newScore);
        }

        updatePongGame(gameId, {
          ball: finalBall,
          ...(newScore ? { score: newScore } : {}),
        });

        return finalBall;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isHost, gameId, score]);

  function movePlayer1(x: number) {
    const clampedX = Math.max(
      0,
      Math.min(x, TABLE_WIDTH - player1PaddleRef.current.width),
    );
    const updated = { ...player1PaddleRef.current, x: clampedX };
    setPlayer1Paddle(updated);
    if (gameId) updatePongGame(gameId, { player1Paddle: updated });
  }

  function movePlayer2(x: number) {
    const clampedX = Math.max(
      0,
      Math.min(x, TABLE_WIDTH - player2PaddleRef.current.width),
    );
    const updated = { ...player2PaddleRef.current, x: clampedX };
    setPlayer2Paddle(updated);
    if (gameId) updatePongGame(gameId, { player2Paddle: updated });
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
