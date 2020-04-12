const React = require("react-native");
const { Platform } = React;
import { Colors, Layout, HediyeciBL } from "../../toolbox";

export default {
  background: {
    flex: 1,
    width: null,
    height: Layout.window.height,
    backgroundColor: Colors.white
  },

  containerZiyaretCombo: {
    margin: 10
  },

  ziyaretIcon: {
    color: Colors.brandPrimary,
    fontSize: 16
  },
  ziyaretLabel: {
    fontWeight: "900",
    fontSize: 14,
    marginLeft: 8,
    color: Colors.gray,
    textAlign: "center",
    flex: 1
  },

  ziyaretCombo: {
    width: 270,
    textAlign: "center"
  },

  selectedZiyaretValue: {
    color: Colors.brandPrimary,
    textAlign: "right",
    flex: 1,
    paddingRight: 10,
    fontWeight: "900"
  },

  ziyaretComboIcon: {
    color: Colors.brandPrimary,
    fontSize: 25
  },

  ziyaretItemStyle: {
    borderRadius: 10,
    marginTop: 5,
    marginRight: 10,
    backgroundColor: Colors.white
  },

  ziyaretItemText: {
    color: Colors.brandPrimary,
    fontWeight: "900"
  },

  modal: {
    backgroundColor: Colors.white,
    position: "absolute",
    width: Layout.window.width,
    height: 280,
    marginTop: 80
  },
  listItemContainer: {
    flexDirection: "row",
    flex: 1,
    borderColor: Colors.main3,
    borderWidth: 2,
    margin: 2
  },

  listItemName: {
    color: Colors.main3,
    flex: 1,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 5
  },
  overviewHeaderContainer: {
    alignItems: "center",
    backgroundColor: Colors.main3
  },
  overviewHeader: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    fontWeight: "900",
    alignSelf: "flex-start",
    textAlign: "left",
    color: Colors.main4
  },
  overviewHead: {
    opacity: 0.8,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF"
  },
  hediyeModelHeader: {
    fontSize: 24,
    paddingTop: 0,
    paddingBottom: 0,
    fontWeight: "900",
    alignSelf: "center",
    textAlign: "center",
    color: Colors.white
  },

  timelineView: {
    paddingLeft: 30,
    backgroundColor: "#fff"
  },
  timelineContent: {
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 15
  },
  contentContainer: {
    backgroundColor: "#fff",
    padding: 0,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    borderRadius: 24,
    paddingLeft: 10
  },
  hediyeAdi: {
    color: Colors.main2,
    alignSelf: "center",
    fontWeight: "bold",
    flex: 1
  },
  hediyeDegerButonu: {
    alignSelf: "flex-end",
    borderColor: Colors.main3
  },

  hediyeDegeri: {
    color: Colors.main2,
    fontWeight: "bold",
    marginTop: 5
  },

  timelineIcon: {
    alignSelf: "center",
    color: "#999"
  },

  timeIcon: {
    fontSize: 20,
    paddingRight: 10,
    color: "#666",
    marginLeft: Platform.OS === "android" ? 15 : 0,
    paddingLeft: Platform.OS === "android" ? 0 : 20,
    marginTop: Platform.OS === "android" ? -2 : -3
  },

  timelineTextHeader: {
    color: "#222",
    fontSize: 14,
    fontWeight: "700",
    paddingTop: Platform.OS === "android" ? 5 : 0
  },
  timelineTextComment: {
    color: "#aaa",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5
  },

  inputContent: {
    marginTop: 10,
    alignItems: "center",
    width: 300
  },

  inputItems: {
    borderColor: "#ccc",
    borderWidth: 0,
    borderRadius: 18,
    color: "#ccc",
    textAlign: "right",
    padding: 8,
    marginRight: 20,
    fontWeight: "bold",
    fontSize: 30
  },
  inputEklenecekDeger: {
    borderColor: "#ccc",
    borderWidth: 0,
    borderRadius: 18,
    color: Colors.main1,
    textAlign: "right",
    padding: 8,
    paddingRight: 20,
    fontWeight: "bold",
    fontSize: 30,
    width: 200
  },

  inputLabels: {
    color: Colors.brandPrimary,
    flex: 1,
    textAlign: "left",
    marginLeft: 20
  },
  optionButtonContainer: {
    flexDirection: "row",
    flex: 1,
    margin: 8,
    padding: 10,
    backgroundColor: "transparent",

    alignItems: "center"
  },
  optionButton: {
    margin: 8,
    flex: 1,
    width: 300,
    backgroundColor: Colors.main3
  },
  optionButtonText: {
    alignItems: "center",
    textAlign: "center",
    flex: 1
  }
};
