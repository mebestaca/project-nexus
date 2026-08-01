import { auth } from "@/firebase/config";
import { Stack } from "expo-router";
import { signInAnonymously } from "firebase/auth";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialValues = {
  name: "",
};

export default function Index() {
  const handleSubmit = async (
    values: typeof initialValues,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    },
  ) => {
    try {
      await signInAnonymously(auth);
      // router.replace("/employee");
    } catch (error: any) {
      let message = "Something went wrong. Please try again.";

      switch (error.code) {
        case "auth/invalid-email":
          message =
            "Please enter a valid email address (e.g., name@example.com).";
          break;

        case "auth/invalid-credential":
          message = "Invalid email or password.";
          break;

        case "auth/user-not-found":
          message = "No account exists with this email.";
          break;

        case "auth/wrong-password":
          message = "Incorrect password. Try again.";
          break;

        case "auth/network-request-failed":
          message = "Network error. Check your internet connection.";
          break;

        default:
          message = error.message;
      }

      Alert.alert("Sign In Failed", message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView>
        <View>
          <Text>🐾</Text>
          <Text>Welcome</Text>

          <Text></Text>

          <Pressable onPress={() => {}}>
            <Text>Play</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}
