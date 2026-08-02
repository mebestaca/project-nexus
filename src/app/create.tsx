import { Picker } from "@react-native-picker/picker";
import { Formik, FormikHelpers } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import { router } from "expo-router";

type GameType = "tictactoe" | "arkanoid" | "spaceshooter";

interface CreateGameValues {
  gameName: string;
  gameType: GameType | "";
}

const GAME_TYPES: { label: string; value: GameType }[] = [
  { label: "Tic Tac Toe", value: "tictactoe" },
  { label: "Arkanoid", value: "arkanoid" },
  { label: "Space Shooter", value: "spaceshooter" },
];

const CreateGameSchema = Yup.object().shape({
  gameName: Yup.string()
    .trim()
    .min(3, "Game name must be at least 3 characters")
    .max(30, "Game name must be 30 characters or less")
    .required("Game name is required"),
  gameType: Yup.string()
    .oneOf(
      ["tictactoe", "arkanoid", "spaceshooter"],
      "Please select a game type",
    )
    .required("Please select a game type"),
});

const initialValues: CreateGameValues = {
  gameName: "",
  gameType: "",
};

export default function CreateGameScreen() {
  const handleHostGame = (
    values: CreateGameValues,
    { setSubmitting }: FormikHelpers<CreateGameValues>,
  ) => {
    console.log("Hosting game:", values);
    
    router.push("/pingpong")
    setSubmitting(false);
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
                <Text style={styles.hostButtonText}>Host</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
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
    marginBottom: 24,
  },
  form: {
    flex: 1,
    justifyContent: "space-between",
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  pickerWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 12,
    marginTop: 4,
  },
  hostButton: {
    backgroundColor: "#111827",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  hostButtonDisabled: {
    opacity: 0.5,
  },
  hostButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
