import ChoiceButton from "@/components/rps/ChoiceButton";
import ChoiceDisplay from "@/components/rps/ChoiceDisplay";
import ResultBanner from "@/components/rps/ResultBanner";
import Scoreboard from "@/components/rps/Scoreboard";
import WaitingChoice from "@/components/rps/WaitingChoice";
import { useRPS } from "@/hooks/useRPS";
import { useLocalSearchParams } from "expo-router";
import { Button, ScrollView, StyleSheet, View } from "react-native";

export default function RPSScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();

  const {
    playerChoice,
    opponentChoice,
    revealOpponent,
    score,
    result,
    waiting,
    myName,
    opponentName,
    selectChoice,
    nextRound,
    leaveGame,
  } = useRPS(gameId!);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Scoreboard
        player1Name={myName}
        player2Name={opponentName}
        player1Score={score.player1}
        player2Score={score.player2}
      />

      <ChoiceDisplay
        playerChoice={playerChoice}
        opponentChoice={revealOpponent ? opponentChoice : null}
      />

      <ResultBanner result={result} />

      {waiting && <WaitingChoice />}

      <ChoiceButton
        choice="rock"
        onPress={selectChoice}
        disabled={waiting || !!playerChoice}
      />
      <ChoiceButton
        choice="paper"
        onPress={selectChoice}
        disabled={waiting || !!playerChoice}
      />
      <ChoiceButton
        choice="scissors"
        onPress={selectChoice}
        disabled={waiting || !!playerChoice}
      />

      {result !== "" && (
        <View style={styles.hiddenContainer}>
          <Button title="Next Round" onPress={nextRound} />

          <View style={styles.buttonSpacing} />

          <Button title="Back to Lobby" onPress={leaveGame} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#ECE7E3",
  },

  hiddenContainer: {
    marginTop: 30,
  },

  button: {
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

  buttonSpacing: {
    height: 12,
  },
});
