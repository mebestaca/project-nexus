import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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