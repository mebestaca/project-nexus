import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECE7E3", paddingHorizontal: 16 },

  centered: { flex: 1, justifyContent: "center", alignItems: "center" },

  title: { fontSize: 32, fontWeight: "900", marginTop: 12, color: "#38137D" },

  subtitle: { fontSize: 14, color: "#5E3D9B", marginTop: 8, marginBottom: 16 },

  listContent: { paddingBottom: 12 },

  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "#FFFFFF",

    padding: 16,
    marginBottom: 10,
    marginEnd: 10,
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

  playerName: { fontSize: 16, fontWeight: "600", color: "#ECE7E3" },

  badge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },

  badgeReady: { backgroundColor: "#3D9B5E" },

  badgeWaiting: { backgroundColor: "#e57310bc" },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ECE7E3",
  },

  badgeHost: { backgroundColor: "#3D9B5E" },

  buttonRow: { flexDirection: "row", gap: 12, marginBottom: 16 },

  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#38137D",
    borderRadius: 12,
    marginBottom: 16,
    //hard shadow styling
    shadowColor: "#5E3D9B",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #5E3D9B",
  },

  cancelButtonText: { color: "#ECE7E3", fontWeight: "700", fontSize: 16 },

  actionButton: {
    // flex: 1,
    // paddingVertical: 16,
    // borderRadius: 12,
    // alignItems: "center",
    // backgroundColor: "#38137D",
    // marginBottom: 16,
    // //hard shadow styling
    // shadowColor: "#5E3D9B",
    // shadowOffset: { width: 4, height: 4 },
    // shadowOpacity: 1,
    // shadowRadius: 0,
    // boxShadow: "4px 4px 0px 0px #5E3D9B",
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#e57310bc",
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
    //hard shadow styling
    shadowColor: "#a2520b",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #a2520b",
  },
  startButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#3D9B5E",
    marginBottom: 16,
    //hard shadow styling
    shadowColor: "#137D38",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #137D38",
  },

  actionButtonReady: {
    opacity: 1,
    // borderRadius: 12,
    backgroundColor: "#3D9B5E",
    // paddingVertical: 16,
    // alignItems: "center",
    // marginBottom: 16,
    // //hard shadow styling
    shadowColor: "#137D38",
    // shadowOffset: { width: 4, height: 4 },
    // shadowOpacity: 1,
    // shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #137D38",
  },

  actionButtonDisabled: { opacity: 0.4 },

  actionButtonText: { color: "#ECE7E3", fontWeight: "700", fontSize: 16 },

  line: {
    height: 5,
    alignSelf: "stretch",
    backgroundColor: "#7D3813",
    borderRadius: 5,
    marginEnd: 10,

    //shadow styling
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    boxShadow: "4px 4px 0px 0px #3F1C0A",
  },
});

// textAlign: "center",
// fontSize: 25,
// fontWeight: "500",
// marginTop: 20,
// color: "#ECE7E3",
// backgroundColor: "#8c4b28",
// //border styling
// borderRadius: 12,
// borderWidth: 10,
// borderTopColor: "#9B5E3D",
// borderLeftColor: "#9B5E3D",
// borderRightColor: "#7D3813",
// borderBottomColor: "#7D3813",
// //shadow styling
// shadowColor: "#000",
// shadowOffset: { width: 4, height: 4 },
// shadowOpacity: 1,
// shadowRadius: 0,
// boxShadow: "4px 4px 0px 0px #3F1C0A",
