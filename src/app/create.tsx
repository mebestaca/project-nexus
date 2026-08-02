import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { styles } from "@/types/create";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Formik, FormikHelpers } from "formik";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreateGameSchema } from "./validation/createSchema";

type GameType = "tictactoe" | "pong" | "spaceshooter";

interface CreateGameValues {
  gameName: string;
  gameType: GameType | "";
}

const GAME_TYPES: { label: string; value: GameType }[] = [
  { label: "Tic Tac Toe", value: "tictactoe" },
  { label: "Pong", value: "pong" },
  { label: "Space Shooter", value: "spaceshooter" },
];

const MAX_PLAYERS_BY_TYPE: Record<GameType, number> = {
  tictactoe: 2,
  pong: 2,
  spaceshooter: 2,
};

const initialValues: CreateGameValues = {
  gameName: "",
  gameType: "",
};

export default function CreateGameScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const handleHostGame = async (
    values: CreateGameValues,
    { setSubmitting }: FormikHelpers<CreateGameValues>,
  ) => {
    if (!user) {
      Alert.alert("Not signed in", "You must be logged in to host a game.");
      setSubmitting(false);
      return;
    }

    try {
      const lobbyRef = doc(collection(db, "lobby"));
      const lobbyId = lobbyRef.id;

      const gameType = values.gameType as GameType;
      const gameRef = doc(collection(db, "lobby", lobbyId, gameType));
      const gameId = gameRef.id;

      const hostId = user.uid;
      const hostName = user.displayName || user.email || "Host";

      await setDoc(lobbyRef, {
        gameName: values.gameName.trim(),
        gameType,
        createdAt: serverTimestamp(),
      });

      await setDoc(gameRef, {
        name: values.gameName.trim(),
        host: hostName,
        status: "waiting",
        players: [{ id: hostId, name: hostName, ready: false }],
        maxPlayers: MAX_PLAYERS_BY_TYPE[gameType],
        createdAt: serverTimestamp(),
      });

      router.push({
        pathname: "/waiting",
        params: {
          lobbyId,
          gameType,
          gameId,
          isHost: "true",
        },
      });
    } catch (error) {
      console.error("Error hosting game:", error);
      Alert.alert("Error", "Could not host the game. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Create a Game</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={CreateGameSchema}
          onSubmit={handleHostGame}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            isSubmitting,
          }) => (
            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.label}>Game Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter game name"
                  onChangeText={handleChange("gameName")}
                  onBlur={handleBlur("gameName")}
                  value={values.gameName}
                />
                {touched.gameName && errors.gameName && (
                  <Text style={styles.errorText}>{errors.gameName}</Text>
                )}
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Game Type</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={values.gameType}
                    onValueChange={(itemValue) =>
                      setFieldValue("gameType", itemValue)
                    }
                  >
                    <Picker.Item label="Select a game..." value="" />
                    {GAME_TYPES.map((game) => (
                      <Picker.Item
                        key={game.value}
                        label={game.label}
                        value={game.value}
                      />
                    ))}
                  </Picker>
                </View>
                {touched.gameType && errors.gameType && (
                  <Text style={styles.errorText}>{errors.gameType}</Text>
                )}
              </View>

              <TouchableOpacity
                style={[
                  styles.hostButton,
                  isSubmitting && styles.hostButtonDisabled,
                ]}
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
              >
                <Text style={styles.hostButtonText}>
                  {isSubmitting ? "Hosting..." : "Host"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
