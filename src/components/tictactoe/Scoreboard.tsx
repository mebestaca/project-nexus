import { StyleSheet, Text, View } from "react-native";

interface Props {
    playerX: number;
    playerO: number;
}

export default function Scoreboard({playerX, playerO}: Props) {
    return (
        <View style={styles.container}>

            <Text style={styles.text}>
                X: {playerX}
            </Text>

            <Text style={styles.text}>
                O: {playerO}
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