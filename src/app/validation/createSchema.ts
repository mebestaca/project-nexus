import * as Yup from "yup";

export const CreateGameSchema = Yup.object().shape({
  gameName: Yup.string()
    .trim()
    .min(3, "Game name must be at least 3 characters")
    .max(30, "Game name must be 30 characters or less")
    .required("Game name is required"),
  gameType: Yup.string()
    .oneOf(["tictactoe", "pong", "spaceshooter"], "Please select a game type")
    .required("Please select a game type"),
});
