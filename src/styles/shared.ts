import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  alignment: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 15,

    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },

  error: {
    color: "red",
    fontSize: 13,
    marginTop: 5,
  },

  primaryButton: {
    marginTop: 25,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#2563eb",

    justifyContent: "center",
    alignItems: "center",
  },

  primaryButtonDisabled: {
    opacity: 0.5,
  },

  secondaryButton: {
    marginTop: 15,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2563eb",

    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "600",
  },

  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  loadingText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  showButton: {
    alignSelf: "flex-end",
    marginTop: 8,
  },

  showText: {
    color: "#2563eb",
    fontWeight: "600",
  },

  footer: {
    marginTop: 20,
    alignItems: "center",
  },

  footerText: {
    color: "#2563eb",
    fontSize: 14,
  },
});
