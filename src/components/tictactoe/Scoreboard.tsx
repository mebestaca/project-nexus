import { StyleSheet, Text, View } from "react-native";

interface Props {
    playerXName: string;
    playerOName: string;
    playerXScore: number;
    playerOScore: number;
}

export default function Scoreboard({
    playerXName,
    playerOName,
    playerXScore,
    playerOScore, 
}: Props) {
    return (
        <View style={styles.container}>

            <Text style={styles.text}>
                {playerXName}: {playerXScore}
            </Text>

            <Text style={styles.text}>
                {playerOName}: {playerOScore}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 40,
        marginBottom: 20,
    },

    text: {
        fontSize: 22,
        fontWeight: "700",
    },
});