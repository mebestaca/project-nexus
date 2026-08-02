import { StyleSheet, View, Button } from "react-native";
import ChoiceButton from "@/components/rps/ChoiceButton";
import ChoiceDisplay from "@/components/rps/ChoiceDisplay";
import ResultBanner from "@/components/rps/ResultBanner";
import Scoreboard from "@/components/rps/Scoreboard";
import WaitingChoice from "@/components/rps/WaitingChoice";
import { useRPS } from "@/hooks/useRPS";
import { RPSChoice } from "@/types/rps";

export default function RPSScreen() {

  const {

    playerChoice,
    opponentChoice,
    score,
    result,
    waiting,
    selectChoice,
    opponentPlayed,
    nextRound,

  } = useRPS();


  function play(choice: RPSChoice) {

    selectChoice(choice);

    setTimeout(() => {

      const choices: RPSChoice[] = [
        "rock",
        "paper",
        "scissors",
      ];

      const random =
        choices[
          Math.floor(
            Math.random() *
            choices.length
          )
        ];

      opponentPlayed(random);

    }, 1000);

  }

  return (

    <View style={styles.container}>

      <Scoreboard
        player1={score.player1}
        player2={score.player2}
      />

      <ChoiceDisplay
        playerChoice={playerChoice}
        opponentChoice={opponentChoice}
      />

      <ResultBanner
        result={result}
      />

      {waiting && (
        <WaitingChoice />
      )}

      <ChoiceButton
        choice="rock"
        onPress={play}
        disabled={waiting}
      />

      <ChoiceButton
        choice="paper"
        onPress={play}
        disabled={waiting}
      />

      <ChoiceButton
        choice="scissors"
        onPress={play}
        disabled={waiting}
      />

      {result !== "" && (

        <Button
          title="Next Round"
          onPress={nextRound}
        />

      )}

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