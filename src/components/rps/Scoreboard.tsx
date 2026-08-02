import { StyleSheet, Text, View } from "react-native";

interface Props {
    player1: number;
    player2: number;
}

export default function Scoreboard({
    player1,
    player2,
}: Props) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>
                    You
                </Text>

                <Text style={styles.score}>
                    {player1}
                </Text>
            </View>

            <View>
                <Text style={styles.label}>
                    Opponent
                </Text>

                <Text style={styles.score}>
                    {player2}
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
    label: {
        textAlign: "center",
        fontWeight: "700",
        fontSize: 18,
    },
    score: {
        textAlign: "center",
        fontSize: 32,
        marginTop: 8,
    },
});