import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DisplayNameField from "./DisplayName";
import SubmitButton from "./SubmitButton";

import { styles } from "@/styles/shared";

export default function SigninForm() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView>
        <View style={styles.container}>
          <DisplayNameField />
          <SubmitButton />
        </View>
      </SafeAreaView>
    </>
  );
}
