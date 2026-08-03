import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#8c4b28",
    paddingHorizontal: 16,
    paddingVertical: 0,
    marginBottom: 12,
    //border styling
    borderRadius: 12,
    borderWidth: 10,
    borderColor: "#9B5E3D",
    borderRightColor: "#7D3813",
    borderBottomColor: "#7D3813",
    //hard shadow styling
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #3F1C0A",
  },
  cardInfo: {
    flex: 1,
    marginRight: 12,
  },
  gameName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#ECE7E3",
  },
  gameMeta: {
    fontSize: 13,
    fontWeight: 200,
    color: "#ECE7E3",
  },
  joinButton: {
    backgroundColor: "#38137D",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    //hard shadow styling
    shadowColor: "#5E3D9B",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #5E3D9B",
  },
  joinButtonText: {
    color: "#ECE7E3",
    fontWeight: "600",
    fontSize: 14,
  },
});
