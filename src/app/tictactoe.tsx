import Board from "@/components/tictactoe/Board";
import Status from "@/components/tictactoe/Status";
import { useAuth } from "@/context/AuthContext";
import { subscribeToGame, updateGame } from "@/services/gameService";
import { Board as BoardType, Game, Player } from "@/types/game";
import { checkWinner } from "@/utils/winner";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function GameScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const { user } = useAuth();
  const [board, setBoard] = useState<BoardType>(Array(9).fill(""));
  const [turn, setTurn] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "" | "draw">("");
  const [playerX, setPlayerX] = useState<string>("");
  const [playerO, setPlayerO] = useState<string>("");

  useEffect(() => {
    if (!gameId) return;

    const unsubscribe = subscribeToGame(gameId, (game: Game) => {
      if (!game) return;
      setBoard(game.board);
      setTurn(game.turn);
      setWinner(game.winner);
      setPlayerX(game.playerX);
      setPlayerO(game.playerO ?? "");
    });

    return unsubscribe;
  }, [gameId]);

  const mySymbol: Player | null =
    user?.uid === playerX ? "X" : user?.uid === playerO ? "O" : null;

  async function play(index: number) {
    if (winner) return;
    if (board[index] !== "") return;
    if (mySymbol !== turn) return; // not your turn

    const newBoard = [...board];
    newBoard[index] = turn;

    const gameWinner = checkWinner(newBoard);

    await updateGame(gameId!, {
      board: newBoard,
      turn: turn === "X" ? "O" : "X",
      winner: gameWinner ?? "",
    });
  }

  return (
    <View style={styles.container}>
      <Status turn={turn} winner={winner} />
      <Board board={board} onMove={play} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
