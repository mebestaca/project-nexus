import { View, StyleSheet } from "react-native";

interface Props {
    x: number;
    y: number;
    size: number;
}

export default function Ball({
    x,
    y,
    size,
}: Props) {

    return (
        <View style={[styles.ball,
            {
                left:x,
                top:y,
                width:size,
                height:size,
                borderRadius:size/2,
            }
        ]}
        />
    );
}

const styles = StyleSheet.create({

    ball:{
        position:"absolute",
        backgroundColor:"white",
    }
});