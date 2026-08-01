import { View, StyleSheet } from "react-native";
import Table from "@/components/pingpong/Table";
import Ball from "@/components/pingpong/Ball";
import Paddle from "@/components/pingpong/Paddle";
import Scoreboard from "@/components/pingpong/Scoreboard";
import { usePingPong } from "@/hooks/usePingPong";

export default function PingPongScreen() {
    const {
        ball,
        player1Paddle,
        player2Paddle,
        score,
    } = usePingPong();

    return (
        <View style={styles.container}>

            <Scoreboard
                player1={score.player1}
                player2={score.player2}
            />

            <Table>

                <Ball
                    x={ball.x}
                    y={ball.y}
                    size={ball.size}
                />

                <Paddle
                    {...player1Paddle}
                />

                <Paddle
                    {...player2Paddle}
                />

            </Table>

        </View>
    );
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
});

