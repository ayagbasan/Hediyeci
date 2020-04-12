// @flow
import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import Sidebar from "./Sidebar";
import walkthrough from "./walkthrough";
import veriGirisi from "./veriGirisi";
import katalog from "./katalog";
import ayarlar from "./ayarlar";
import hediyePaylas from "./hediyePaylas";
import sifirla from "./sifirla";
import raporlama from "./raporlama";
import yedekleme from "./yedekleme";
import hakkinda from "./hakkinda";

const Drawer = DrawerNavigator(
  {
    walkthrough: { screen: walkthrough },
    veriGirisi: { screen: veriGirisi },
    katalog: { screen: katalog },
    ayarlar: { screen: ayarlar },
    hediyePaylas: { screen: hediyePaylas },
    sifirla: { screen: sifirla },
    raporlama: { screen: raporlama },
    yedekleme: { screen: yedekleme },
    hakkinda: { screen: hakkinda }
  },
  {
    initialRouteName: "veriGirisi",
    contentComponent: props => <Sidebar {...props} />
  }
);

const App = StackNavigator(
  {
    veriGirisi: { screen: veriGirisi },
    walkthrough: { screen: walkthrough },
    Drawer: { screen: Drawer }
  },
  {
    index: 0,
    initialRouteName: "walkthrough",
    headerMode: "none"
  }
);

export default () => (
  <Root>
    <App />
  </Root>
);
