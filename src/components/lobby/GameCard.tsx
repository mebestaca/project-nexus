import { styles } from "@/styles/gamecard";
import { Room } from "@/types/room";
import { Text, TouchableOpacity, View } from "react-native";

interface RoomCardProps {
  room: Room;
  onJoin: (gameId: string) => void;
}

export function GameCard({ room, onJoin }: RoomCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.gameName}>{room.name}</Text>
        <Text style={styles.gameMeta}>
          Hosted by {room.host} · {room.players.length}/{room.maxPlayers}{" "}
          players
        </Text>
      </View>
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => onJoin(room.lobbyId)}
      >
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>
    </View>
  );
}
