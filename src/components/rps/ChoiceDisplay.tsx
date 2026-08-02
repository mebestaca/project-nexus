import { StyleSheet, Text, View } from "react-native";
import { RPSChoice } from "@/types/rps";

interface Props {
    playerChoice: RPSChoice | null;
    opponentChoice: RPSChoice | null;
}

export default function ChoiceDisplay({
    playerChoice,
    opponentChoice,
}: Props) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.choice}>
                    {playerChoice ?? "-"}
                </Text>
            </View>

            <View>
                <Text style={styles.choice}>
                    {opponentChoice ?? "-"}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    
    choice: {
        fontSize: 28,
        textAlign: "center",
        marginTop: 10,
    },
});