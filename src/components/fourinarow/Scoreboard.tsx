import { StyleSheet, Text, View } from "react-native";

interface Props {
    player1: number;
    player2: number;
}

export default function Scoreboard({player1, player2}: Props) {
    return (
        <View style={styles.container}>

            <Text style={styles.text}>
                🔴 {player1}
            </Text>

            <Text style={styles.text}>
                🟡 {player2}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-around",
        width:"100%",
        marginBottom:20,
    },

    text:{
        fontSize: 24,
        fontWeight:"700",
    },
});