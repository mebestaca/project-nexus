import { StyleSheet, View, Button } from "react-native";
import Board from "@/components/fourinarow/Board";
import ColumnButton from "@/components/fourinarow/ColumnButton";
import Scoreboard from "@/components/fourinarow/Scoreboard";
import Status from "@/components/fourinarow/Status";
import { useFourInARow } from "@/hooks/useFourInARow";

export default function FourInARowScreen() {
    const {
        board,
        turn,
        winner,
        score,
        dropPiece,
        resetBoard,
        resetMatch,
    } = useFourInARow();

    return (
        <View style={styles.container}>

            <Scoreboard
                player1={score.player1}
                player2={score.player2}
            />

            <Status
                turn={turn}
                winner={winner}
            />

            <View style={styles.columns}>
                {
                    Array.from({ length: 7 }).map(
                        (_, index) => (

                        <ColumnButton
                            key={index}
                            column={index}
                            onPress={dropPiece}
                        />

                        )
                    )
                }
            </View>

            <Board
                board={board}
            />

            <View style={styles.buttons}>

                <Button
                    title="Next Round"
                    onPress={resetBoard}
                />

                <Button
                    title="Reset Match"
                    onPress={resetMatch}
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },

    columns: {
        flexDirection: "row",
        marginBottom: 8,
    },

    buttons: {
        flexDirection: "row",
        marginTop: 20,
        gap: 20
    },
});