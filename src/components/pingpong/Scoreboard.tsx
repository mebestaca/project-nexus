import { Text, View } from "react-native";

interface Props {
    player1: number;
    player2: number;
}

export default function Scoreboard({
    player1,
    player2,
}: Props) {

    return (
        <View>

            <Text>
                Player 1 {player1} - Player 2 {player2}
            </Text>

        </View>
    );
}