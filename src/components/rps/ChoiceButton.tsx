import { RPSChoice } from "@/types/rps";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  choice: RPSChoice;
  onPress: (choice: RPSChoice) => void;
  disabled?: boolean;
}

const labels: Record<RPSChoice, string> = {
  rock: "🪨 Rock",
  paper: "📄 Paper",
  scissors: "✂️ Scissors",
};

export default function ChoiceButton({
  choice,
  onPress,
  disabled = false,
}: Props) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabled]}
      onPress={() => onPress(choice)}
      disabled={disabled}
    >
      <Text style={styles.text}>{labels[choice]}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "#8c4b28",
    //border styling
    borderWidth: 10,
    borderColor: "#9B5E3D",
    borderRightColor: "#7D3813",
    borderBottomColor: "#7D3813",
    //hard shadow styling
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #3F1C0A",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 18,
  },
});
