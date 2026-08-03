import Board from "@/components/fourinarow/Board";
import ColumnButton from "@/components/fourinarow/ColumnButton";
import Scoreboard from "@/components/fourinarow/Scoreboard";
import Status from "@/components/fourinarow/Status";
import { useFourInARow } from "@/hooks/useFourInARow";
import { useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FourInARowScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();

  const {
    board,
    turn,
    winner,
    score,
    player1Name,
    player2Name,
    dropPiece,
    resetBoard,
    resetMatch,
    leaveGame,
  } = useFourInARow(gameId!);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Scoreboard
        player1Name={player1Name}
        player2Name={player2Name}
        player1Score={score.player1}
        player2Score={score.player2}
      />
      <Status
        turn={turn}
        winner={winner}
        player1Name={player1Name}
        player2Name={player2Name}
      />

      <View style={styles.columns}>
        {Array.from({ length: 7 }).map((_, index) => (
          <ColumnButton key={index} column={index} onPress={dropPiece} />
        ))}
      </View>

      <Board board={board} />

      {winner !== "" && (
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={resetBoard}>
            <Text style={styles.buttonText}>Next Round</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={leaveGame}>
            <Text style={styles.buttonText}>Back to Lobby</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  columns: {
    flexDirection: "row",
    marginBottom: 8,
  },

  buttons: {
    marginTop: 30,
    width: "100%",
  },

  button: {
    marginHorizontal: 25,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "#8c4b28",
    //border styling
    borderWidth: 10,
    borderTopColor: "#9B5E3D",
    borderLeftColor: "#9B5E3D",
    borderRightColor: "#7D3813",
    borderBottomColor: "#7D3813",
    //shadow styling
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #3F1C0A",
  },

  buttonText: {
    color: "#ECE7E3",
    fontSize: 18,
    fontWeight: "700",
  },
});
