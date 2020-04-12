// packages
import { Alert, BackHandler } from "react-native";
import { log } from "./Logger";
export default {
  exitApp: () => {
    Alert.alert(
      "Hediyeci",
      "Uygulamadan çıkmak istiyor musunuz?",
      [
        {
          text: "Hayır",

          style: "cancel"
        },
        {
          text: "Evet",
          onPress: () => BackHandler.exitApp()
        }
      ],
      {
        cancelable: false
      }
    );
    return true;
  },

  backButton: callback => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      callback();
      return true;
    });
  },
  backButtonHandler: () => {
    BackHandler.removeEventListener("hardwareBackPress", () => {});
  }
};
