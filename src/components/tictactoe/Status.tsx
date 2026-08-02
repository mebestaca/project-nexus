import { StyleSheet, Text, View } from "react-native";

interface Props {
  turn: string;
  winner: string | "" | "draw";
  waiting?: boolean;
}

export default function Status({
  turn,
  winner,
  waiting = false,
}: Props) {
  let message = "";

  if (waiting) {
    message = "Waiting for another player...";
  } else if (winner === "draw") {
    message = "It's a draw!";
  } else if (winner) {
    message = `${winner} wins! 🎉`;
  } else {
    message = `${turn}'s turn`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
});