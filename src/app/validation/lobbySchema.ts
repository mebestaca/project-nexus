import * as Yup from "yup";

export const lobbySchema = Yup.object({
  lobbyName: Yup.string()
    .required("Lobby name is required")
    .min(3, "Lobby name must be at least 3 characters"),

  gameType: Yup.string().required("Please select a game"),
});

export default function _() {
  return null;
}
