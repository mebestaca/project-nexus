import { View, StyleSheet } from "react-native";
import Cell from "./Cell";
import { Board as BoardType } from "@/types/game";

interface Props {
    board: BoardType;
    onMove: (index: number) => void;
}

export default function Board({ board, onMove }: Props) {
    return (
        <View style={styles.board}>
            {board.map((cell, index) => (
                <Cell
                    key={index}
                    value={cell}
                    onPress={() => onMove(index)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    board: {
        width: 300,
        flexDirection: "row",
        flexWrap: "wrap",
    },
});