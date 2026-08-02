import { StyleSheet, Text, View } from "react-native";
import { Player } from "@/types/fourinarow";

interface Props {
    turn: Player;
    winner:
        | Player
        | "draw"
        | "";
}

export default function Status({turn, winner}: Props) {
    let message="";

    if(winner === "draw") {
        message="Draw!";
    }
    else if(winner) {
        message =
            winner==="R"
            ? "Red wins 🎉"
            : "Yellow wins 🎉";
    }
    else{
        message = 
        turn==="R"
        ? "Red's turn"
        : "Yellow's turn";
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