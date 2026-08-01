import * as Yup from "yup";

export const signinSchema = Yup.object({
  displayName: Yup.string().required("Name is required."),
});

export default function _() {
  return null;
}
