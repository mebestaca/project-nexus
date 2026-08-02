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
        fontSize: 42,
        fontWeight: "900",
        marginTop: 8,
        color: "#2563EB",
    },

    name: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "800",
        color: "#111827",
        maxWidth: 120,
    },
});