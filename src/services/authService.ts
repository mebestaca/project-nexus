import { signInAnonymously, updateProfile } from "firebase/auth";

import { auth } from "@/firebase/config";

export async function signInUser(displayName: string) {
  const credential = await signInAnonymously(auth);

  await updateProfile(credential.user, {
    displayName,
  });

  return credential.user;
}
