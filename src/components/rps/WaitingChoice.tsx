import { StyleSheet, Text, View } from "react-native";

export default function WaitingChoice() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Waiting for your opponent...
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
        fontSize: 20,
        fontWeight: "600",
    },
});