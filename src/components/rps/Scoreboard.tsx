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
                <Text>{player1Name}</Text>
                <Text>{player1Score}</Text>
            </View>

            <View>
                <Text>{player2Name}</Text>
                <Text>{player2Score}</Text>
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