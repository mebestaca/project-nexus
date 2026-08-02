import { Pressable, StyleSheet, Text } from "react-native";
import { RPSChoice } from "@/types/rps";

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
        <Pressable style={[
            styles.button,
            disabled && styles.disabled,
        ]}
        onPress={() => onPress(choice)}
        disabled={disabled}
        >
            <Text style={styles.text}>
                {labels[choice]}
            </Text>

        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#2563EB",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginVertical: 8,
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