import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { createFourInARowGame } from "@/services/fourInARowService";
import { createGame } from "@/services/gameService";
import { createRPSGame, joinRPSGame } from "@/services/rpsService";
import { styles } from "@/styles/waiting";
import { GameType, Player, Room } from "@/types/room";
import { router, useLocalSearchParams } from "expo-router";
import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ROUTE_BY_GAME_TYPE: Record<GameType, string> = {
  tictactoe: "/tictactoe",
  rockpaperscissors: "/rps",
  connectfour: "/fourinarow",
};

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
  const [starting, setStarting] = useState(false);

  const gameRef = useMemo(() => {
    if (!lobbyId || !gameType || !gameId) return null;
    return doc(db, "lobby", lobbyId, gameType, gameId);
  }, [lobbyId, gameType, gameId]);

  useEffect(() => {
    if (!gameRef) return;

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
          pathname: ROUTE_BY_GAME_TYPE[gameType] as any,
          params: { gameId: data.gameId },
        });
      }
    });

    return unsubscribe;
  }, [gameRef, gameType, isHost]);

  const currentPlayer = room?.players.find((p) => p.id === user?.uid);

  const allReady = useMemo(() => {
    if (!room) return false;

    let hasJoiningPlayer = false;

    for (const p of room.players) {
      if (p.isHost) continue;

      hasJoiningPlayer = true;

      if (!p.ready) return false;
    }
    return hasJoiningPlayer;
  }, [room]);

  const handleToggleReady = async () => {
    if (!room || !currentPlayer || !gameRef) return;

    const updatedPlayers = room.players.map((p) =>
      p.id === currentPlayer.id ? { ...p, ready: !p.ready } : p,
    );

    await updateDoc(gameRef, { players: updatedPlayers });
  };

  const handleStartGame = async () => {
    if (!room || !gameRef || starting) return;
    const hostPlayer = room.players.find((p) => p.isHost);
    const otherPlayer = room.players.find((p) => !p.isHost);

    if (!hostPlayer || !otherPlayer) {
      Alert.alert(
        "Not enough players",
        "This game needs two players to start.",
      );
      return;
    }

    setStarting(true);

    try {
      let matchId: string;

      if (gameType === "tictactoe") {
        matchId = await createGame(
          { uid: hostPlayer.id, name: hostPlayer.name },
          { uid: otherPlayer.id, name: otherPlayer.name },
        );
      } else if (gameType === "rockpaperscissors") {
        const docRef = await createRPSGame(room.name, {
          uid: hostPlayer.id,
          name: hostPlayer.name,
        });
        matchId = docRef.id;

        await joinRPSGame(matchId, {
          uid: otherPlayer.id,
          name: otherPlayer.name,
        });
      } else if (gameType === "connectfour") {
        const docRef = await createFourInARowGame(room.name, {
          uid: hostPlayer.id,
          name: hostPlayer.name,
        });
        matchId = docRef.id;

        await updateDoc(docRef, {
          guest: {
            uid: otherPlayer.id,
            name: otherPlayer.name,
          },
        });
      } else {
        setStarting(false);
        return;
      }

      await updateDoc(gameRef, { status: "started", gameId: matchId });
    } catch (error) {
      console.error("Error starting game:", error);
      Alert.alert("Error", "Could not start the game. Please try again.");
      setStarting(false);
    }
  };

  const handleCancel = async () => {
    if (!room || !user || !gameRef || !lobbyId) {
      router.back();
      return;
    }

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
      <View style={styles.line}></View>
      <Text style={styles.subtitle}>Host: {room.host}</Text>

      <FlatList
        data={room.players}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }: { item: Player }) => {
          const isPlayerHost = item.isHost;

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
        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>

        {isHost ? (
          <Pressable
            style={[
              styles.startButton,
              (!allReady || starting) && styles.actionButtonDisabled,
            ]}
            onPress={handleStartGame}
            disabled={!allReady || starting}
          >
            <Text style={styles.actionButtonText}>
              {starting ? "Starting…" : "Start"}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={[
              styles.actionButton,
              currentPlayer?.ready && styles.actionButtonReady,
            ]}
            onPress={handleToggleReady}
          >
            <Text style={styles.actionButtonText}>
              {currentPlayer?.ready ? "Not Ready" : "Ready"}
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
