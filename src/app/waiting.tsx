import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { createGame } from "@/services/gameService";
import { GameType, Player, Room } from "@/types/room";
import { router, useLocalSearchParams } from "expo-router";
import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WaitingRoomScreen() {
  const { user } = useAuth();
  const params = useLocalSearchParams<{
    lobbyId: string;
    gameType: GameType;
    gameId: string;
    isHost: string;
  }>();

  const { lobbyId, gameType, gameId } = params;
  const isHost = params.isHost === "true";

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lobbyId || !gameType || !gameId) return;

    const gameRef = doc(db, "lobby", lobbyId, gameType, gameId);

    const unsubscribe = onSnapshot(gameRef, (snapshot) => {
      if (!snapshot.exists()) {
        setRoom(null);
        setLoading(false);
        if (!isHost) {
          Alert.alert("Room closed", "The host has ended this room.");
          router.back();
        }
        return;
      }

      const data = snapshot.data() as Room;
      setRoom(data);
      setLoading(false);

      if (data.status === "started" && data.gameId) {
        router.replace({
          pathname: "/tictactoe",
          params: { gameId: data.gameId },
        });
      }
    });

    return unsubscribe;
  }, [lobbyId, gameType, gameId]);

  const currentPlayer = room?.players.find((p) => p.id === user?.uid);
  const joiningPlayers =
    room?.players.filter((p) => p.name !== room.host) ?? [];
  const allReady =
    joiningPlayers.length > 0 && joiningPlayers.every((p) => p.ready);

  const handleToggleReady = async () => {
    if (!room || !currentPlayer || !lobbyId || !gameType || !gameId) return;

    const gameRef = doc(db, "lobby", lobbyId, gameType, gameId);
    const updatedPlayers = room.players.map((p) =>
      p.id === currentPlayer.id ? { ...p, ready: !p.ready } : p,
    );

    await updateDoc(gameRef, { players: updatedPlayers });
  };

  const handleStartGame = async () => {
    if (!room || !lobbyId || !gameType || !gameId) return;

    const gameRef = doc(db, "lobby", lobbyId, gameType, gameId);
    const hostPlayer = room.players.find((p) => p.name === room.host);
    const otherPlayer = room.players.find((p) => p.name !== room.host);

    if (!hostPlayer || !otherPlayer) {
      Alert.alert(
        "Not enough players",
        "This game needs two players to start.",
      );
      return;
    }

    let matchId: string;

    if (gameType === "tictactoe") {
      matchId = await createGame(hostPlayer.id, otherPlayer.id);
    } else {
      return;
    }

    await updateDoc(gameRef, { status: "started", gameId: matchId });
  };

  const handleCancel = async () => {
    if (!room || !user || !lobbyId || !gameType || !gameId) {
      router.back();
      return;
    }

    const gameRef = doc(db, "lobby", lobbyId, gameType, gameId);
    const lobbyRef = doc(db, "lobby", lobbyId);

    try {
      if (isHost) {
        await deleteDoc(gameRef);
        await deleteDoc(lobbyRef);
      } else {
        const updatedPlayers = room.players.filter((p) => p.id !== user.uid);
        await updateDoc(gameRef, { players: updatedPlayers });
      }
      router.back();
    } catch (error) {
      console.error("Error leaving room:", error);
      Alert.alert("Error", "Could not leave the room. Please try again.");
    }
  };
  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#111827" />
      </SafeAreaView>
    );
  }

  if (!room) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Room not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{room.name}</Text>
      <Text style={styles.subtitle}>Host: {room.host}</Text>

      <FlatList
        data={room.players}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }: { item: Player }) => {
          const isPlayerHost = item.name === room.host;
          return (
            <View style={styles.playerRow}>
              <Text style={styles.playerName}>{item.name}</Text>
              <View
                style={[
                  styles.badge,
                  isPlayerHost
                    ? styles.badgeHost
                    : item.ready
                      ? styles.badgeReady
                      : styles.badgeWaiting,
                ]}
              >
                <Text style={styles.badgeText}>
                  {isPlayerHost ? "Host" : item.ready ? "Ready" : "Not Ready"}
                </Text>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        {isHost ? (
          <TouchableOpacity
            style={[
              styles.actionButton,
              !allReady && styles.actionButtonDisabled,
            ]}
            onPress={handleStartGame}
            disabled={!allReady}
          >
            <Text style={styles.actionButtonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.actionButton,
              currentPlayer?.ready && styles.actionButtonReady,
            ]}
            onPress={handleToggleReady}
          >
            <Text style={styles.actionButtonText}>
              {currentPlayer?.ready ? "Not Ready" : "Ready"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F7", paddingHorizontal: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", marginTop: 12 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20 },
  listContent: { paddingBottom: 12 },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  playerName: { fontSize: 16, fontWeight: "600" },
  badge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },
  badgeReady: { backgroundColor: "#DCFCE7" },
  badgeWaiting: { backgroundColor: "#F3F4F6" },
  badgeText: { fontSize: 12, fontWeight: "600", color: "#111827" },
  buttonRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: { color: "#111827", fontWeight: "700", fontSize: 16 },
  actionButton: {
    flex: 1,
    backgroundColor: "#111827",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  actionButtonReady: { backgroundColor: "#16A34A" },
  actionButtonDisabled: { opacity: 0.4 },
  actionButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
  badgeHost: { backgroundColor: "#DBEAFE" },
});
