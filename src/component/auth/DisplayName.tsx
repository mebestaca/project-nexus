import { useFormikContext } from "formik";
import { Text, TextInput } from "react-native";

import { styles } from "@/styles/shared";

type GuestFormValues = {
  displayName: string;
};

export default function DisplayNameField() {
  const { values, errors, touched, handleBlur, handleChange } =
    useFormikContext<GuestFormValues>();

  return (
    <>
      <Text style={styles.label}>Display Name</Text>

      <TextInput
        style={styles.input}
        value={values.displayName}
        onChangeText={handleChange("displayName")}
        onBlur={handleBlur("displayName")}
      />

      {touched.displayName && errors.displayName && (
        <Text style={styles.error}>{errors.displayName}</Text>
      )}
    </>
  );
}
