const React = require("react-native");
const { Platform } = React;
import { Colors } from "../../toolbox";

export default {
  links: {
    margin: 15,
    flexDirection: "row"
  },
  linkText: {
    paddingLeft: 15,
    color: Colors.main4
  },
  logoutContainer: {
    padding: 30,
    paddingTop: 0
  },
  logoutbtn: {
    paddingTop: 30,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#fff"
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: Colors.primary
  },
  drawerContent: {
    paddingTop: Platform.OS === "android" ? 20 : 30
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: Platform.OS === "android" ? 40 : 20
  },
  menuIcon: {
    fontSize: 20,
    color: Colors.main4
  }
};
