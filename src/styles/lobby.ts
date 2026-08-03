import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
    paddingHorizontal: 16,
  },
  title: {
    color: "#38137D",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 12,
    marginBottom: 2,
  },
  listContent: {
    paddingBottom: 12,
    paddingHorizontal: 4,
  },
  hostButton: {
    backgroundColor: "#38137D",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    //hard shadow styling
    shadowColor: "#5E3D9B",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #5E3D9B",
  },
  hostButtonText: {
    color: "#ECE7E3",
    fontWeight: "700",
    fontSize: 16,
  },
  line: {
    height: 3,
    alignSelf: "stretch",
    backgroundColor: "#7D3813",
    borderRadius: 5,
    marginBottom: 14,
  },
});
