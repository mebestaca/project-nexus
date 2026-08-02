import Ball from "@/components/pingpong/Ball";
import Paddle from "@/components/pingpong/Paddle";
import Scoreboard from "@/components/pingpong/Scoreboard";
import Table from "@/components/pingpong/Table";
import { useAuth } from "@/context/AuthContext";
import { TABLE_WIDTH, usePingPong } from "@/hooks/usePingPong";
import { subscribeToPongGame } from "@/services/pingPongService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { PanResponder, StyleSheet, View } from "react-native";

export default function PingPongScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const { user } = useAuth();
  const [isPlayer1, setIsPlayer1] = useState<boolean | null>(null);

  useEffect(() => {
    if (!gameId || !user) return;
    const unsubscribe = subscribeToPongGame(gameId, (game) => {
      if (!game) return;
      setIsPlayer1(game.player1Id === user.uid);
    });
    return unsubscribe;
  }, [gameId, user]);

  const {
    ball,
    player1Paddle,
    player2Paddle,
    score,
    movePlayer1,
    movePlayer2,
  } = usePingPong(gameId!, isPlayer1 === true);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event) => {
      const rawX = event.nativeEvent.locationX;
      const x = isPlayer1 ? rawX : TABLE_WIDTH - rawX;

      if (isPlayer1) {
        movePlayer1(x);
      } else {
        movePlayer2(x);
      }
    },
  });

  if (isPlayer1 === null) return null;

  return (
    <View style={styles.container}>
      <Scoreboard player1={score.player1} player2={score.player2} />

      <View style={!isPlayer1 ? styles.rotated : undefined}>
        <Table {...panResponder.panHandlers}>
          <Ball x={ball.x} y={ball.y} size={ball.size} />
          <Paddle {...player1Paddle} />
          <Paddle {...player2Paddle} />
        </Table>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  rotated: { transform: [{ rotate: "180deg" }] },
});
