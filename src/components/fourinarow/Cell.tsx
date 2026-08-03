import { Cell as CellType } from "@/types/fourinarow";
import { StyleSheet, View } from "react-native";

interface Props {
  value: CellType;
}

export default function Cell({ value }: Props) {
  return (
    <View
      style={[
        styles.cell,
        value === "R" && styles.red,
        value === "Y" && styles.yellow,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    margin: 3,
  },

  red: {
    backgroundColor: "#EF4444",
  },

  yellow: {
    backgroundColor: "#fecb00",
  },
});
