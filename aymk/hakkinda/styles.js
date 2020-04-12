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

  newsCommentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15,
    borderLeftWidth: 2,
    borderLeftColor: Colors.main1
  },
  newsComment: {
    color: Colors.main1,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 28
  },
  newsComment1: {
    color: Colors.gray,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 28
  }
};
