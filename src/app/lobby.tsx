import { GameCard } from "@/components/lobby/GameCard";
import { styles } from "@/styles/lobby";
import { Room } from "@/types/room";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_GAMES: Room[] = [
  {
    lobbyId: "lobby_001",
    gameType: "tictactoe",
    gameId: "game_001",
    isHost: "false",
    playerId: "player_001",
    playerName: "Alex",
    name: "Alex's Tic Tac Toe",
    host: "Alex",
    players: 1,
    maxPlayers: 2,
  },
  {
    lobbyId: "lobby_002",
    gameType: "pong",
    gameId: "game_002",
    isHost: "false",
    playerId: "player_002",
    playerName: "Jamie",
    name: "Jamie's Pong Match",
    host: "Jamie",
    players: 1,
    maxPlayers: 2,
  },
  {
    lobbyId: "lobby_003",
    gameType: "spaceshooter",
    gameId: "game_003",
    isHost: "false",
    playerId: "player_003",
    playerName: "Sam",
    name: "Sam's Space Battle",
    host: "Sam",
    players: 3,
    maxPlayers: 4,
  },
  {
    lobbyId: "lobby_004",
    gameType: "tictactoe",
    gameId: "game_004",
    isHost: "false",
    playerId: "player_004",
    playerName: "Taylor",
    name: "Taylor's Quick Match",
    host: "Taylor",
    players: 2,
    maxPlayers: 2,
  },
];

export default function GameListScreen() {
  const [games, setGames] = React.useState<Room[]>(MOCK_GAMES);

  const handleJoin = (gameId: string) => {
    console.log("Joining game", gameId);
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
