import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { loading, user } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="lobby" options={{ title: "Lobby" }} />
        <Stack.Screen name="create" options={{ title: "Create" }} />
        <Stack.Screen name="rps" options={{ title: "RockPaperScissors" }} />
        <Stack.Screen name="tictactoe" options={{ title: "TicTacToe" }} />
        <Stack.Screen name="waiting" options={{ title: "Waiting" }} />
        <Stack.Screen name="fourinarow" options={{ title: "ConnectFour" }} />
      </Stack.Protected>
    </Stack>
  );
}
