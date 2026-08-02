import { StyleSheet, Text, View } from "react-native";
import { Player } from "@/types/fourinarow";

interface Props {
    turn: Player;
    winner:
        | Player
        | "draw"
        | "";
    player1Name: string;
    player2Name: string;
}

export default function Status({
    turn, 
    winner,
    player1Name,
    player2Name,
}: Props) {
    let message="";

    if(winner === "draw") {
        message="Draw!";
    }
    else if(winner) {
        message =
            winner==="R"
            ? `${player1Name} wins 🎉`
            : `${player2Name} wins 🎉`;
    }
    else{
        message = 
        turn==="R"
        ? `${player1Name}'s turn`
        : `${player2Name}'s turn `;
    }

    return (
        <View style={styles.container}>

            <Text style={styles.text}>
                {message}
            </Text>

        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        marginVertical:15,
    },

    text: {
        fontSize:22,
        fontWeight:"700",
    },
});