import Board from "@/components/tictactoe/Board";
import Scoreboard from "@/components/tictactoe/Scoreboard";
import Status from "@/components/tictactoe/Status";
import { useAuth } from "@/context/AuthContext";
import { subscribeToGame, updateGame } from "@/services/gameService";
import { Board as BoardType, Game, Player } from "@/types/game";
import { checkWinner } from "@/utils/winner";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function GameScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const { user } = useAuth();
  const [board, setBoard] = useState<BoardType>(Array(9).fill(""));
  const [turn, setTurn] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "" | "draw">("");
  const [playerX, setPlayerX] = useState({
    uid: "",
    name: "",
  });

  const [playerO, setPlayerO] = useState<{
    uid: string;
    name: string;
  } | null>(null);

  const [score, setScore] = useState({ playerX: 0, playerO: 0 });

  useEffect(() => {
    if (!gameId) return;

    const unsubscribe = subscribeToGame(gameId, (game: Game) => {
      if (!game) return;

      if (game.status === "left") {
        Alert.alert("Game ended", "The other player left the match.");

        router.replace("/lobby");
        return;
      }

      setBoard(game.board);
      setTurn(game.turn);
      setWinner(game.winner);
      setPlayerX(game.playerX);
      setPlayerO(game.playerO);
      setScore(game.score);
    });

    return unsubscribe;
  }, [gameId]);

  const mySymbol: Player | null =
    user?.uid === playerX.uid ? "X" : user?.uid === playerO?.uid ? "O" : null;

  async function play(index: number) {
    if (winner) return;
    if (board[index] !== "") return;
    if (mySymbol !== turn) return;

    const newBoard = [...board];
    newBoard[index] = turn;

    const gameWinner = checkWinner(newBoard);

    const updatedScore = { ...score };

    if (gameWinner === "X") {
      updatedScore.playerX++;
    }

    if (gameWinner === "O") {
      updatedScore.playerO++;
    }

    await updateGame(gameId!, {
      board: newBoard,
      turn: turn === "X" ? "O" : "X",
      winner: gameWinner ?? "",
      score: updatedScore,
    });
  }

  function getPlayerName(symbol: Player) {
    if (symbol === "X") {
      return playerX.name;
    }

    return playerO?.name ?? "Waiting...";
  }

  const turnName = getPlayerName(turn);

  const winnerName =
    winner && winner !== "draw" ? getPlayerName(winner) : winner;

  async function nextRound() {
    let nextStarter: Player;

    if (winner === "X") {
      nextStarter = "O";
    } else if (winner === "O") {
      nextStarter = "X";
    } else {
      nextStarter = "X";
    }

    await updateGame(gameId!, {
      board: Array(9).fill(""),
      turn: nextStarter,
      winner: "",
    });
  }

  async function resetMatch() {
    await updateGame(gameId!, {
      board: Array(9).fill(""),
      turn: "X",
      winner: "",
      score: {
        playerX: 0,
        playerO: 0,
      },
    });
  }

  async function leaveGame() {
    await updateGame(gameId!, {
      status: "left",
    });
  }

  function GameButton({
    title,
    onPress,
  }: {
    title: string;
    onPress: () => void;
  }) {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Scoreboard
        playerXName={playerX.name}
        playerOName={playerO?.name ?? "Waiting..."}
        playerXScore={score.playerX}
        playerOScore={score.playerO}
      />

      <Status turn={turnName} winner={winnerName} />

      <Board board={board} onMove={play} />

      {winner !== "" && (
        <>
          <GameButton title="Next Round »" onPress={nextRound} />

          <GameButton title="Reset Match ↺" onPress={resetMatch} />

          <GameButton title="Back to Lobby ↩" onPress={leaveGame} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECE7E3",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },

  button: {
    width: 220,
    paddingVertical: 14,
    marginTop: 12,
    backgroundColor: "#38137d",
    borderRadius: 12,
    alignItems: "center",
    //shadow styling
    shadowColor: "#5e3d9b",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },

  buttonText: {
    color: "#ECE7E3",
    fontSize: 16,
    fontWeight: "700",
  },
});
