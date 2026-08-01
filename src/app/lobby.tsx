import { router } from "expo-router";
import React from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Game {
  id: string;
  name: string;
  host: string;
  players: number;
  maxPlayers: number;
}

const MOCK_GAMES: Game[] = [
  {
    id: "1",
    name: "Friday Night Trivia",
    host: "Alex",
    players: 3,
    maxPlayers: 8,
  },
  { id: "2", name: "Word Blitz", host: "Jamie", players: 5, maxPlayers: 6 },
  { id: "3", name: "Charades Chaos", host: "Sam", players: 2, maxPlayers: 10 },
];

interface GameCardProps {
  game: Game;
  onJoin: (gameId: string) => void;
}

function GameCard({ game, onJoin }: GameCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.gameName}>{game.name}</Text>
        <Text style={styles.gameMeta}>
          Hosted by {game.host} · {game.players}/{game.maxPlayers} players
        </Text>
      </View>
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => onJoin(game.id)}
      >
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function GameListScreen() {
  const [games, setGames] = React.useState<Game[]>(MOCK_GAMES);

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard game={item} onJoin={handleJoin} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.hostButton} onPress={handleHostGame}>
        <Text style={styles.hostButtonText}>Host a Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardInfo: {
    flex: 1,
    marginRight: 12,
  },
  gameName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  gameMeta: {
    fontSize: 13,
    color: "#666",
  },
  joinButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  joinButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  hostButton: {
    backgroundColor: "#111827",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  hostButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
