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
  container: {
    flexDirection: "row",
    padding: 10
  },
  col0: {
    width: 140
  },
  columns: {},

  cellTitle: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.main4,
    borderWidth: 2,
    borderColor: Colors.main1,
    margin: 2,
    borderRadius: 6
  },
  cellText: {
    textAlign: "center",
    color: Colors.main2,
    fontWeight: "bold"
  },
  headerCell: {
    width: 120,
    padding: 10,
    backgroundColor: Colors.main4,
    borderWidth: 2,
    borderColor: Colors.main2,
    margin: 2,
    borderRadius: 6,
    textAlign: "center"
  },
  headerText: {
    textAlign: "center",
    color: Colors.main2,
    fontWeight: "bold"
  },
  dataCell: {
    width: 120,
    padding: 10,
    backgroundColor: Colors.main4,
    borderWidth: 2,
    borderColor: Colors.grey,
    margin: 2,
    borderRadius: 6,
    textAlign: "center"
  },
  dataText: {
    textAlign: "center",
    color: Colors.main2
  }
};
