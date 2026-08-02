import { StyleSheet, Text, View } from "react-native";

interface Props {
  turn: string;
  winner: string | "" | "draw";
  waiting?: boolean;
}

export default function Status({ turn, winner, waiting = false }: Props) {
  let message = "";

  if (waiting) {
    message = "Waiting for another player...";
  } else if (winner === "draw") {
    message = "It's a draw!";
  } else if (winner) {
    message = `🎉 ${winner} Wins! 🎉`;
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
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#8c4b28",
    //border styling
    borderRadius: 12,
    borderWidth: 10,
    borderColor: "#9B5E3D",
    borderRightColor: "#7D3813",
    borderBottomColor: "#7D3813",
    //shadow styling
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ECE7E3",
  },
});
