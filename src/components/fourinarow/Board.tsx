import { StyleSheet, View } from "react-native";
import Cell from "./Cell";
import { Board as BoardType } from "@/types/fourinarow";

interface Props {
    board: BoardType;
}

export default function Board({board}: Props) {
    return (
        <View style={styles.board}>
            {board.map(
                (row, rowIndex) => (
                    <View
                        key={rowIndex}
                        style={styles.row}
                    >
                        {row.map(
                            (cell, colIndex) => (
                                <Cell
                                    key={colIndex}
                                    value={cell}
                                />
                            )
                        )}
                    </View>
                )
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    board: {
        backgroundColor: "2563EB",
        padding: 8,
        borderRadius: 12,
    },

    row: {
        flexDirection: "row",
    },
});