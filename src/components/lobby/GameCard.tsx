import { styles } from "@/styles/gamecard";
import { Room } from "@/types/room";
import { Pressable, Text, View } from "react-native";

interface RoomCardProps {
  room: Room;
  onJoin: (room: Room) => void;
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
      <Pressable style={styles.joinButton} onPress={() => onJoin(room)}>
        <Text style={styles.joinButtonText}>Join</Text>
      </Pressable>
    </View>
  );
}
