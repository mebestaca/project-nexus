import { View } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";

import {
  signinSchema
} from "@/app/validation/signinSchema";

import SigninForm from "@/components/auth/SigninForm";

import {
  signInUser
} from "@/services/authService";


const initialValues = {
  displayName:"",
};


export default function Index(){

  const router =
    useRouter();



  async function handleSubmit(
    values: typeof initialValues,
    {
      setSubmitting,
    }: {
      setSubmitting:(value:boolean)=>void;
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