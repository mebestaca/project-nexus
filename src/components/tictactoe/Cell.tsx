import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  value: string;
  onPress: () => void;
}

export default function Cell({ value, onPress }: Props) {
  return (
    <Pressable style={styles.cell} onPress={onPress}>
      <Text style={styles.text}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8c4b28",
    //border styling
    borderRadius: 12,
    borderWidth: 10,
    borderColor: "#9B5E3D",
    borderRightColor: "#7D3813",
    borderBottomColor: "#7D3813",
    //hard shadow styling
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "38137D",
  },
});
