import { StyleSheet, Text, View } from "react-native";

interface Props {
  playerXName: string;
  playerOName: string;
  playerXScore: number;
  playerOScore: number;
}

export default function Scoreboard({
  playerXName,
  playerOName,
  playerXScore,
  playerOScore,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>
      <View style={styles.line} />
      <View style={styles.scoring}>
        <Text style={styles.text}>
          {playerXName}: {playerXScore}
        </Text>
        <Text style={styles.text}>V.S.</Text>

        <Text style={styles.text}>
          {playerOName}: {playerOScore}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginBottom: 20,
    alignItems: "center",
    paddingVertical: 14,
    gap: 5,
    paddingHorizontal: 20,
    backgroundColor: "#8c4b28",
    //border styling
    borderRadius: 12,
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
    elevation: 5,
  },
  scoring: {
    flexDirection: "row",
    gap: 25,
  },

  text: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ECE7E3",
  },

  title: {
    flex: 1,
    fontSize: 34,
    fontWeight: "900",
    color: "#ECE7E3",
  },
  line: {
    height: 3,
    alignSelf: "stretch",
    backgroundColor: "#ECE7E3",
    borderRadius: 5,
  },
});
