const React = require("react-native");
const { Dimensions, Platform } = React;
import { Colors, Layout } from "../../toolbox";

export default {
  container: {
    flex: 1,
    width: null,
    height: null
  },
  bgHead: {
    backgroundColor: Colors.primary,
    flex: 1
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: "contain"
  },
  channelBtn1: {
    borderWidth: 1,
    borderColor: Platform.OS === "android" ? "#ddd" : "rgba(255,255,255,0.5)"
  },
  na: {},
  channelImg: {
    height: Layout.window.height / 4 + 10,
    width: Layout.window.width / 2 + 2
  },
  ioschannelImgText: {
    fontSize: 12,
    fontWeight: "900",
    padding: 20,
    paddingLeft: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 20,
    marginTop: Layout.window.height / 6 + 10
  },
  achannelImgText: {
    fontSize: 12,
    fontWeight: "900",
    marginLeft: 20,
    marginTop: Layout.window.height / 4 - 20
  },
  itemContainer: {
    flex: 1,
    borderColor: Colors.brandPrimaryLight,
    borderWidth: 1,
    margin: 4,
    padding: 8,
    borderRadius: 8
  },

  itemContent: {
    flex: 1,
    color: Colors.brandPrimary,
    fontWeight: "bold"
  },
  footerButton: {
    color: Colors.brandPrimary
  },
  modal: {
    backgroundColor: Colors.white,
    position: "absolute",
    width: Layout.window.width,
    maxHeight: 350,
    height: 220,
    top: Platform.OS === "android" ? 55 : 60
  },
  modalHeader: {
    color: Colors.brandPrimary,
    padding: 8,
    textAlign: "center",
    fontSize: 30,
    flex: 1,
    fontWeight: "bold"
  },
  modalRow: {
    flexDirection: "column",
    flex: 1
  },
  modalCaption: {
    flex: 0,
    textAlign: "left",
    color: Colors.gray
  },
  modalValue: {
    flex: 1,
    fontWeight: "bold",
    paddingLeft: 18,
    borderColor: Colors.brandPrimary,
    borderWidth: 1,
    borderRadius: 16,
    marginRight: 10,
    marginLeft: 10
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 30
  },
  btnModalClose: {
    backgroundColor: Colors.green,
    flex: 1,
    flexDirection: "row",
    margin: 10
  },

  btnModalDelete: {
    backgroundColor: Colors.brandDanger,
    flex: 1,
    flexDirection: "row",
    margin: 10
  },

  btnModalKaydet: {
    backgroundColor: Colors.brandPrimary,
    flex: 3,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
  },
  btnModalText: {
    fontWeight: "bold",
    color: Colors.white,
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12
  },

  nofileContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  nofileImage: {
    marginTop: 40,
    fontSize: 96,
    color: Colors.brandPrimary,
    textAlign: "center"
  },
  nofileText: {
    color: Colors.brandPrimary,
    marginTop: 40,
    marginBottom: 40
  },
  btnCreateFile: {
    margin: 10
  }
};
