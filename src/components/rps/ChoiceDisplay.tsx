import { StyleSheet, Text, View } from "react-native";
import { RPSChoice } from "@/types/rps";

interface Props {
    playerName: string;
    opponentName: string;
    playerChoice: RPSChoice | null;
    opponentChoice: RPSChoice | null;
}

export default function ChoiceDisplay({
    playerName,
    opponentName,
    playerChoice,
    opponentChoice,
}: Props) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{playerName}</Text>
                <Text style={styles.choice}>
                    {playerChoice ?? "-"}
                </Text>
            </View>

            <View>
                <Text style={styles.title}>{opponentName}</Text>
                <Text style={styles.choice}>
                    {opponentChoice ?? "-"}
                </Text>
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
    title: {
        fontWeight: "700",
        fontSize: 18,
        textAlign: "center",
    },
    choice: {
        fontSize: 28,
        textAlign: "center",
        marginTop: 10,
    },
});