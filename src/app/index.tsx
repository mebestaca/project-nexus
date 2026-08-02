import SigninForm from "@/components/auth/SigninForm";
import { signInUser } from "@/services/authService";
import { signinSchema } from "@/validation/signinSchema";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { View } from "react-native";

const initialValues = {
  displayName: "",
};

export default function Index() {
  const router = useRouter();

  async function handleSubmit(
    values: typeof initialValues,
    {
      setSubmitting,
    }: {
      setSubmitting: (value: boolean) => void;
    },
  ) {
    try {
      await signInUser(values.displayName);

      router.replace("/lobby");
    } catch (error) {
      console.error("Sign-in failed:", error);
      alert("Sign-in failed: " + (error as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signinSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      <View>
        <SigninForm />
      </View>
    </Formik>
  );
}
