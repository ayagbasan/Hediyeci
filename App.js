import React from "react";
import { Alert } from "react-native";
import Setup from "./src/boot/setup";
import SplashScreen from "react-native-splash-screen";

export default class App extends React.Component {
  componentDidMount() {
    setTimeout(function() {
      SplashScreen.hide();
    }, 1000);
  }
  render() {
    // eslint-disable-next-line no-console
    console.disableYellowBox = true;
    return <Setup />;
  }
}
