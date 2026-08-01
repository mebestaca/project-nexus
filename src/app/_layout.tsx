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
      </Stack.Protected>
    </Stack>
  );
}
