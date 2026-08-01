import { Stack } from "expo-router";
import { View } from "react-native";
import DisplayNameField from "./DisplayName";
import SubmitButton from "./SubmitButton";

export default function SigninForm() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <DisplayNameField />
        <SubmitButton />
      </View>
    </>
  );
}
