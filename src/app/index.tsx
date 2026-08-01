import { View } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";

<<<<<<< HEAD
import { signinSchema } from "@/app/validation/signinSchema";
import SigninForm from "@/component/auth/SigninForm";
import { auth } from "@/firebase/config";
import { router } from "expo-router";
=======
import {
  signinSchema
} from "@/app/validation/signinSchema";

import SigninForm from "@/components/auth/SigninForm";

import {
  signInUser
} from "@/services/authService";

>>>>>>> 1f148f7fcfaa8ea09fe85cfbf10f1c1a6ba812dd

const initialValues = {
  displayName:"",
};


export default function Index(){

  const router =
    useRouter();



  async function handleSubmit(
    values: typeof initialValues,
<<<<<<< HEAD
    { setSubmitting }: { setSubmitting: (value: boolean) => void },
  ) => {
    try {
      const credential = await signInAnonymously(auth);

      await updateProfile(credential.user, {
        displayName: values.displayName,
      });

      router.replace("/lobby");
    } finally {
      setSubmitting(false);
=======
    {
      setSubmitting,
    }: {
      setSubmitting:(value:boolean)=>void;
>>>>>>> 1f148f7fcfaa8ea09fe85cfbf10f1c1a6ba812dd
    }
  ){

    try{

      await signInUser(
        values.displayName
      );


      router.replace("/home");


    } finally {

      setSubmitting(false);

    }

  }



  return(

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