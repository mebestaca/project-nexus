import { GameCard } from "@/components/lobby/GameCard";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { styles } from "@/styles/lobby";
import { GameType, Room } from "@/types/room";
import { router } from "expo-router";
import {
  arrayUnion,
  collectionGroup,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_GAMES: Room[] = [];

export default function GameListScreen() {
  const [games, setGames] = React.useState<Room[]>(MOCK_GAMES);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const gameTypes: GameType[] = ["tictactoe", "pong", "spaceshooter"];
    const unsubscribes = gameTypes.map((gameType) => {
      const q = collectionGroup(db, gameType);
      return onSnapshot(q, (snapshot) => {
        setGames((prev) => {
          const filtered = prev.filter((g) => g.gameType !== gameType);
          const updated = snapshot.docs
            .map((docSnap) => {
              const data = docSnap.data();
              const lobbyId = docSnap.ref.parent.parent?.id;
              if (!lobbyId) return null;
              return {
                lobbyId,
                gameId: docSnap.id,
                gameType,
                name: data.name,
                host: data.players?.[0]?.name ?? "Unknown",
                status: data.status,
                players: data.players ?? [],
                maxPlayers: data.maxPlayers ?? 2,
                isHost: "false",
                playerId: "",
                playerName: "",
              } as Room;
            })
            .filter((g): g is Room => g !== null && g.status === "waiting");
          return [...filtered, ...updated];
        });
        setLoading(false);
      });
    });

    return () => unsubscribes.forEach((unsub) => unsub());
  }, []);

  const handleJoin = async (room: Room) => {
    if (!user) {
      Alert.alert("Not signed in", "You must be logged in to join a game.");
      return;
    }

    if (room.players.length >= room.maxPlayers) {
      Alert.alert(
        "Room full",
        "This room already has the maximum number of players.",
      );
      return;
    }

    const gameRef = doc(db, "lobby", room.lobbyId, room.gameType, room.gameId);
    const playerName = user.displayName || user.email || "Player";

    try {
      await updateDoc(gameRef, {
        players: arrayUnion({
          id: user.uid,
          name: playerName,
          ready: false,
        }),
      });
    } catch (error) {
      console.error("Error joining game:", error);
      Alert.alert("Error", "Could not join the game.");
      return;
    }

    router.push({
      pathname: "/waiting",
      params: {
        lobbyId: room.lobbyId,
        gameType: room.gameType,
        gameId: room.gameId,
        isHost: "false",
      },
    });
  };

  const handleHostGame = () => {
    console.log("Host a game pressed");
    router.push("/create");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Available Games</Text>

      <FlatList
        data={games}
        keyExtractor={(item) => item.lobbyId}
        renderItem={({ item }) => <GameCard room={item} onJoin={handleJoin} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.hostButton} onPress={handleHostGame}>
        <Text style={styles.hostButtonText}>Host a Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
