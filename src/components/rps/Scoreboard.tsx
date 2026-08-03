import { StyleSheet, Text, View } from "react-native";

interface Props {
  player1Name: string;
  player2Name: string;
  player1Score: number;
  player2Score: number;
}

export default function Scoreboard({
  player1Name,
  player2Name,
  player1Score,
  player2Score,
}: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{player1Name}</Text>
        <Text style={styles.score}>{player1Score}</Text>
      </View>

      <View>
        <Text style={styles.name}>{player2Name}</Text>
        <Text style={styles.score}>{player2Score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  score: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "500",
    marginTop: 20,
    color: "#ECE7E3",
    backgroundColor: "#38137d",
    borderRadius: 12,
    alignItems: "center",
    //shadow styling
    shadowColor: "#5e3d9b",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #5e3d9b",
  },

  name: {
    flexWrap: "nowrap",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    paddingVertical: 3,
    paddingHorizontal: 12,
    color: "#ECE7E3",
    maxWidth: 180,
    backgroundColor: "#38137d",
    borderRadius: 12,
    alignItems: "center",
    //shadow styling
    shadowColor: "#5e3d9b",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #5e3d9b",
  },
});
