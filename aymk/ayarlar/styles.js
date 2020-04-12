const React = require("react-native");
const { Dimensions, Platform } = React;

import { Colors, Layout } from "../../toolbox";
export default {
  seperator: {
    color: Colors.gray,
    fontSize: 18,
    fontWeight: "bold"
  },
  itemIcon: {
    fontSize: 20,
    marginLeft: 8,
    color: Colors.brandPrimary
  },
  itemName: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: "bold"
  },

  itemStyle: { backgroundColor: "#fff", marginRight: 20 },
  itemTextStyle: {
    color: Colors.red,
    fontSize: 14,
    fontWeight: "bold"
  },
  textStyle: {
    color: Colors.brandPrimary,
    fontSize: 14,
    fontWeight: "bold"
  },
  listItem: {
    height: 40
  },
  optionButtonContainer: {
    flexDirection: "row",
    flex: 1,
    margin: 8,
    padding: 10,
    backgroundColor: "transparent"
  },
  optionButton: {
    margin: 8,
    flex: 1
  },
  optionButtonText: {
    alignItems: "center",
    textAlign: "center",
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10
  },
  badge: {
    backgroundColor: Colors.main1,
    marginTop: 5,
    marginLeft: 10
  },

  text: {
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.main4
  },
  slider: {
    flex: 1
  },
  contentContainerDemoHediye: {
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
  hediyeAdiDemo: {
    color: Colors.main2,
    alignSelf: "center",
    fontWeight: "bold",
    flex: 1
  },
  hediyeDegerButonuDemo: {
    alignSelf: "flex-end",
    borderColor: Colors.main3
  },

  hediyeDegeriDemo: {
    color: Colors.main2,
    fontWeight: "bold",
    marginTop: 5
  },
  listItemContainer: {
    flexDirection: "row",
    flex: 1,
    borderColor: Colors.main3,
    borderWidth: 2,
    margin: 8
  }
};
