const React = require("react-native");
const { Dimensions, Platform } = React;
import { Colors, Layout } from "../../toolbox";
export default {
  background: {
    flex: 1,
    width: null,
    height: Layout.window.height,
    backgroundColor: Colors.white
  },

  containerZiyaretCombo: {
    margin: 10,
    flexDirection: "row",
    flex: 1
  },

  itemIcon: {
    color: Colors.brandPrimary,
    fontSize: 16
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
    height: 450
  },
  listItemContainer: {
    flexDirection: "column",
    flex: 1,
    borderColor: Colors.main3,
    borderWidth: 2,
    margin: 8
  },

  listItemName: {
    color: Colors.main3,
    flex: 1,
    fontWeight: "bold",
    textAlign: "left"
  },
  overviewHeaderContainer: {
    alignItems: "center",
    backgroundColor: Colors.brandPrimary
  },
  overviewHeader: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    fontWeight: "900",
    alignSelf: "flex-start",
    textAlign: "left"
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
    color: Colors.brandDanger
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
    backgroundColor: Colors.main4,
    padding: 0,
    borderColor: Colors.main4,
    borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    borderRadius: 24,
    paddingLeft: 10
  },
  timelineIcon: {
    alignSelf: "center",
    color: "#999"
  },
  timelineContentHeading: {
    color: Colors.brandPrimary,
    fontSize: 12,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 8
  },
  newsTypeView: {
    alignSelf: "flex-end",
    flexDirection: "row"
  },
  timeIcon: {
    fontSize: 20,
    paddingRight: 10,
    color: "#666",
    marginLeft: Platform.OS === "android" ? 15 : 0,
    paddingLeft: Platform.OS === "android" ? 0 : 20,
    marginTop: Platform.OS === "android" ? -2 : -3
  },
  time: {
    color: "#666",
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold"
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
  }
};
