import { styles } from "@/styles/gamecard";
import { GameType, Room } from "@/types/room";
import { Pressable, Text, View } from "react-native";

interface RoomCardProps {
  room: Room;
  onJoin: (room: Room) => void;
}

const GAME_TYPE_LABELS: Record<GameType, string> = {
  tictactoe: "Tic-Tac-Toe",
  rockpaperscissors: "Rock Paper Scissors",
  connectfour: "Connect Four",
};

export function GameCard({ room, onJoin }: RoomCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.gameName}>{room.name}</Text>
        <Text style={styles.gameMeta}>
          Game Type: {GAME_TYPE_LABELS[room.gameType]}
        </Text>
        <Text style={styles.gameMeta}>Hosted by: {room.host}</Text>
        <Text style={styles.gameMeta}>
          Current Players: {room.players.length}/{room.maxPlayers} players
        </Text>
      </View>
      <Pressable style={styles.joinButton} onPress={() => onJoin(room)}>
        <Text style={styles.joinButtonText}>Join</Text>
      </Pressable>
    </View>
  );
}
