import React, { Component } from "react";
import { Alert, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { Footer, FooterTab, Badge, Separator, Container, ListItem, Header, Content, Text, Button, Icon, Item, Input, View, Left, Right, Body } from "native-base";
import styles from "./styles.js";
import { AymkHeader, Colors, BackButton, Constants, HediyeciBL } from "../../toolbox";
import { Col, Row, Grid } from "react-native-easy-grid";

type Props = {
  navigation: () => void
};

class raporlama extends Component {
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      ziyaretListesi: [],
      hediyeListesi: [],
      DATA: null
    };
  }

  componentWillUnmount() {
    BackButton.backButtonHandler();
  }

  async componentDidMount() {
    BackButton.backButton(BackButton.exitApp);
    await this.initialize();
  }

  async initialize() {
    let response = await HediyeciBL.readIniFile();

    this.fontSizeZiyaret = HediyeciBL.PARSER.getNumber(Constants.Common.AYARLAR, "fontZiyaret");

    let ziyaretList = HediyeciBL.PARSER.items(Constants.Common.ZIYARET);
    let hediyeList = HediyeciBL.PARSER.items(Constants.Common.HEDIYE);

    this.setState({ ziyaretListesi: ziyaretList, hediyeListesi: hediyeList, isLoading: true, DATA: response.data });
  }

  getirHediyeAdi = optionName => {
    return HediyeciBL.PARSER.get(Constants.Common.HEDIYE, optionName, "Bilinmiyor");
  };

  renderCol0 = () => {
    let rows = [];
    let row0 = (
      <View style={styles.cellTitle}>
        <Text style={styles.cellText}>Hediyeler</Text>
      </View>
    );

    rows.push(row0);

    let index = 0;
    for (const item of this.state.hediyeListesi) {
      let rowBg = index % 2 === 0 ? Colors.bluish : null;
      let textColor = index % 2 === 0 ? Colors.main2 : null;

      let row = (
        <View style={[styles.cellTitle, { backgroundColor: rowBg }]}>
          <Text numberOfLines={1} style={[styles.cellText, { color: textColor }]}>
            {item[1]}
          </Text>
        </View>
      );
      rows.push(row);
      index++;
    }

    return rows;
  };

  renderColumns = () => {
    let rows = [];

    for (const ziyaret of this.state.ziyaretListesi) {
      let dataRows = [];
      let row0 = (
        <View style={styles.headerCell}>
          <Text numberOfLines={1} style={styles.headerText}>
            {ziyaret[1]}
          </Text>
        </View>
      );

      dataRows.push(row0);

      let index = 0;
      for (const hediye of this.state.hediyeListesi) {
        try {
          let isExist = HediyeciBL.PARSER.isHaveOption(ziyaret[0], hediye[0]);

          let row = null;
          let rowBg = index % 2 === 0 ? Colors.bluish : null;
          let textColor = index % 2 === 0 ? Colors.main2 : null;

          if (isExist === true) {
            let value = HediyeciBL.PARSER.getNumber(ziyaret[0], hediye[0]);
            value = value === 0 ? " " : value;

            row = (
              <View style={[styles.dataCell, { backgroundColor: rowBg }]}>
                <Text style={[styles.dataText, { color: textColor }]}>{HediyeciBL.formatNumber(value)}</Text>
              </View>
            );
          } else {
            row = (
              <View style={[styles.dataCell, { backgroundColor: rowBg }]}>
                <Text style={[styles.dataText, { color: textColor }]}>YOK</Text>
              </View>
            );
          }

          dataRows.push(row);
          index++;
        } catch (error) {
          alert(ziyaret[0] + "---" + hediye[0] + error);
        }
      }

      let row = <View style={styles.columns}>{dataRows}</View>;

      rows.push(row);
    }

    return rows;
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <AymkHeader navigation={navigation} title="RAPORLAMA" />

        <Content style={{ backgroundColor: "white" }}>
          <View style={styles.container}>
            <View style={styles.col0}>{this.renderCol0()}</View>
            <ScrollView horizontal>{this.renderColumns()}</ScrollView>
          </View>
        </Content>
      </Container>
    );
  }
}

export default raporlama;
