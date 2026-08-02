import { StyleSheet, Text, View } from "react-native";
import { RPSResult } from "@/types/rps";

interface Props {
    result: RPSResult;
}

export default function ResultBanner({ result }: Props) {
    let message = "";

    switch (result) {
        case "player1":
            message = "You won! 🎉";
            break;
        
        case "player2":
            message = "You lost. 😢";
            break;

        case "draw":
            message = "Draw 🤝";
            break;

        default:
            message = "";
    }

    if (!message) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {message}
            </Text>
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
        fontWeight: "700",
    },
});