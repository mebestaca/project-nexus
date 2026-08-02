// import { View, Button } from "react-native";
// import { router } from "expo-router";
// import { createGame } from "@/services/gameService";
// import { auth } from "@/firebase/config";

// export default function HomeScreen() {
//   async function startTicTacToe() {
//     const userId =
//       auth.currentUser?.uid;

//     if (!userId) {
//       return;
//     }

//     const gameId =
//       await createGame(userId);

//     router.push({
//       pathname: "/tictactoe",
//       params: {
//         gameId,
//       },
//     });
//   }

//   return (
//     <View>

//       <Button
//         title="Create Tic Tac Toe Game"
//         onPress={startTicTacToe}
//       />

//     </View>
//   );
// }