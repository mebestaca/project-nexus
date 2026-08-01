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
        borderWidth: 1,
    },
    text: {
        fontSize: 40,
        fontWeight: "bold",
    },
});