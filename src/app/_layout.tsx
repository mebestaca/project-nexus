import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
<<<<<<< HEAD
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
      </Stack.Protected>
    </Stack>
  );
}
=======
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Tic Tac Toe" }}
      />
      <Stack.Screen
        name="lobby"
        options={{ title: "Waiting Room" }}
      />
      <Stack.Screen
        name="game"
        options={{ title: "Game" }}
      />
    </Stack>
  );
}
>>>>>>> 1f148f7fcfaa8ea09fe85cfbf10f1c1a6ba812dd
