import { styles } from "@/styles/shared";
import { useFormikContext } from "formik";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type GuestFormValues = {
  displayName: string;
};

export default function SubmitButton() {
  const { handleSubmit, isSubmitting, isValid } =
    useFormikContext<GuestFormValues>();

  return (
    <Pressable
      style={[
        styles.primaryButton,
        (!isValid || isSubmitting) && styles.primaryButtonDisabled,
      ]}
      disabled={!isValid || isSubmitting}
      onPress={() => handleSubmit()}
    >
      {isSubmitting ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Joining...</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Continue</Text>
      )}
    </Pressable>
  );
}
