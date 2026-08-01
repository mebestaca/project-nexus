import { View, StyleSheet } from "react-native";

interface Props {
    children: React.ReactNode;
}

export default function Table({
    children,
}: Props) {

    return (
        <View style={styles.table}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({

    table:{
        width:350,
        height:500,
        backgroundColor:"#111",
        overflow:"hidden",
        position:"relative",
    }
});