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
                <Text style={styles.text}>🔴 {player1Name}</Text>
                <Text style={styles.score}>{player1Score}</Text>
            </View>

            <View>
                <Text style={styles.text}>🟡 {player2Name}</Text>
                <Text style={styles.score}>{player2Score}</Text>
            </View>
        
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

    score: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "500",
        marginTop: 20,
        color: "#111827",
    },
});