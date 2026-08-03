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
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 20,
    marginTop: 15,
    color: "#ECE7E3",
    backgroundColor: "#8c4b28",
    //border styling
    borderRadius: 12,
    borderWidth: 10,
    borderColor: "#9B5E3D",
    borderRightColor: "#7D3813",
    borderBottomColor: "#7D3813",
    //hard shadow styling
    shadowColor: "#3F1C0A",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #3F1C0A",
  },

  input: {
    height: 50,
    minWidth: 200,
    borderWidth: 1,
    borderColor: "#5E3D9B",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fafafa",
    //hard shadow styling
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #38137d",
  },

  error: {
    color: "red",
    fontSize: 13,
    marginTop: 5,
  },

  primaryButton: {
    width: 220,
    paddingVertical: 14,
    marginTop: 12,
    backgroundColor: "#38137d",
    borderRadius: 12,
    alignItems: "center",
    //shadow styling
    shadowColor: "#5e3d9b",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #5e3d9b",
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
  container: {
    marginTop: 200,
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
});
