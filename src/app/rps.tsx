import ChoiceButton from "@/components/rps/ChoiceButton";
import ChoiceDisplay from "@/components/rps/ChoiceDisplay";
import ResultBanner from "@/components/rps/ResultBanner";
import Scoreboard from "@/components/rps/Scoreboard";
import WaitingChoice from "@/components/rps/WaitingChoice";
import { useRPS } from "@/hooks/useRPS";
import { useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function RPSScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();

  const {
    playerChoice,
    opponentChoice,
    revealOpponent,
    score,
    result,
    waiting,
    selectChoice,
    nextRound,
  } = useRPS(gameId!);

  return (
    <View style={styles.container}>
      <Scoreboard player1={score.player1} player2={score.player2} />

      <ChoiceDisplay
        playerChoice={playerChoice}
        opponentChoice={
            revealOpponent ? opponentChoice: null}
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

      {result !== "" && <Button title="Next Round" onPress={nextRound} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
});
