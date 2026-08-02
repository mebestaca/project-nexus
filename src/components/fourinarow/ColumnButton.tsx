import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
    column: number;
    onPress:(column:number) => void;
}

export default function ColumnButton({column, onPress}: Props) {
    return (
        <Pressable
            style={styles.button}
            onPress={() =>
                onPress(column)
            }
        >

            <Text style={styles.text}>
                 ↓
            </Text>

        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width:45,
        alignItems:"center",
    },

    text:{
        fontSize: 24,
        color: "#2563EB",
    },
});