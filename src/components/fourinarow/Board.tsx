import { Board as BoardType } from "@/types/fourinarow";
import { StyleSheet, View } from "react-native";
import Cell from "./Cell";

interface Props {
  board: BoardType;
}

export default function Board({ board }: Props) {
  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} value={cell} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#8c4b28",
    //border styling
    borderWidth: 10,
    borderTopColor: "#9B5E3D",
    borderLeftColor: "#9B5E3D",
    borderRightColor: "#7D3813",
    borderBottomColor: "#7D3813",
    //shadow styling
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #3F1C0A",
  },

  row: {
    flexDirection: "row",
  },
});
