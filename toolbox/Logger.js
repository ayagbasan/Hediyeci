/* eslint-disable no-console */

import { Alert } from "react-native";
import Config from "./Config";
const log = (...messages) => {
  if (Config.showLogs) {
    console.log("Hediyeci", messages);
  }
};

const showAlert = (title, message, callback) => {
  Alert.alert(title, message, [{ text: "Tamam", onPress: () => callback }], {
    cancelable: true
  });
};

const showResponseJson = res => {
  Alert.alert("Hata", JSON.stringify(res), [{ text: "Tamam" }], {
    cancelable: true
  });
};

const showResponse = res => {
  if (res.code) {
    Alert.alert(
      "Hata",
      res.message + " (" + res.code + ")",
      [{ text: "Tamam" }],
      {
        cancelable: true
      }
    );
  } else {
    showResponseJson(res);
  }
};

export default { log, showAlert, showResponse };
