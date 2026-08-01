import { signInAnonymously, updateProfile } from "firebase/auth";
import { Formik } from "formik";

import { signinSchema } from "@/app/validation/signinSchema";
import SigninForm from "@/component/auth/SigninForm";
import { auth } from "@/firebase/config";

const initialValues = {
  displayName: "",
};

export default function Index() {
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (value: boolean) => void },
  ) => {
    try {
      const credential = await signInAnonymously(auth);

      await updateProfile(credential.user, {
        displayName: values.displayName,
      });

      // router.replace("/lobby");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signinSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      <SigninForm />
    </Formik>
  );
}
