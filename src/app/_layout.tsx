import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Protected guard={!!user}>
        <Stack.Screen name="lobby" options={{ title: "Lobby" }} />
        <Stack.Screen name="create" options={{ title: "Create" }} />
        <Stack.Screen
          name="rps"
          options={{ title: "RockPaperScissors", headerShown: false }}
        />
        <Stack.Screen
          name="tictactoe"
          options={{ title: "TicTacToe", headerShown: false }}
        />
        <Stack.Screen name="waiting" options={{ title: "Waiting" }} />
        <Stack.Screen
          name="fourinarow"
          options={{ title: "ConnectFour", headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  );
}
