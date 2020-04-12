import React, { Component } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { Footer, FooterTab, Badge, Separator, Container, ListItem, Header, Content, Text, Button, Icon, Item, Input, View, Left, Right, Body } from "native-base";
import Modal from "react-native-modalbox";
import styles from "./styles.js";
import { AymkHeader, Colors, BackButton, Constants, HediyeciBL } from "../../toolbox";
import Moment from "moment";
import "moment/min/locales";
type Props = {
  navigation: () => void
};

class yedekleme extends Component {
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      tumunuSec: false,
      yedekListesi: [],
      hediyeListesi: [],
      selectedCount: 0
    };

    this.arrayHolderHediye = [];
    this.arrayHolderZiyaret = [];
  }

  //
  componentWillUnmount() {
    BackButton.backButtonHandler();
  }

  async componentDidMount() {
    BackButton.backButton(BackButton.exitApp);
    this.initialize();
  }

  async initialize() {
    let result = await HediyeciBL.readDir(HediyeciBL.INI_BACKUP_PATH);
    this.setState({ yedekListesi: result });
  }

  renderYedekItem1 = ({ item }) => {
    Moment.locale("tr");
    return (
      <Button rounded block bordered style={[styles.listItemContainer]} onPress={() => this.ziyaretDegistirildi(item)}>
        <Text style={[{ fontSize: this.fontSizeZiyaret }, styles.listItemName]}>{item.name}</Text>
        <Text style={[{ fontSize: this.fontSizeZiyaret }, styles.listItemName]}>
          {Moment(item.mtime)
            .utcOffset("+0000")
            .format("DD.MM.YYYY HH:mm")}
        </Text>
      </Button>
    );
  };

  renderYedekItem = ({ item }) => {
    Moment.locale("tr");
    return (
      <ListItem avatar>
        <Left>
          <Icon name="database" style={styles.itemIcon}></Icon>
        </Left>

        <Body>
          <TouchableOpacity>
            <Text style={[{ fontSize: this.fontSizeZiyaret }, styles.listItemName]}>{item.name}</Text>
          </TouchableOpacity>
        </Body>
        <Right>
          <Text note>
            {Moment(item.mtime)
              .utcOffset("+0000")
              .format("DD.MM.YYYY HH:mm")}
          </Text>
        </Right>
      </ListItem>
    );
  };

  ziyaretDegistirildi = item => {
    let _selectedCount = 0;
    let _ziyaretListesi = this.state.ziyaretListesi;
    for (const iterator of _ziyaretListesi) {
      if (iterator.optionName === item.optionName) {
        iterator.selected = !item.selected;
      }

      if (iterator.selected === true) _selectedCount++;
    }

    this.setState({
      ziyaretListesi: _ziyaretListesi,
      selectedCount: _selectedCount
    });
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <AymkHeader navigation={navigation} title="YEDEKLEME" />
        <Content style={{ backgroundColor: "white" }}>
          <View>
            <View style={styles.containerZiyaretCombo}>
              <FlatList extraData={this.state} data={this.state.yedekListesi} renderItem={this.renderYedekItem} keyExtractor={item => item.name} />
            </View>
          </View>
        </Content>

        {/* <Footer>
          <FooterTab>
            {!this.state.tumunuSec && (
              <Button full light onPress={() => this.tumunuSecTemizle()}>
                <Icon name="check-circle" style={{ color: Colors.brandPrimary }} />
                <Text style={{ color: Colors.brandPrimary }}>Tümünü Seç</Text>
              </Button>
            )}
            {this.state.tumunuSec && (
              <Button full light onPress={() => this.tumunuSecTemizle()}>
                <Icon name="check" style={{ color: Colors.brandPrimary }} />
                <Text style={{ color: Colors.brandPrimary }}>Temizle</Text>
              </Button>
            )}

            <Button full light onPress={() => this.sifirlaOnay()}>
              <Icon name="power-off" style={{ color: Colors.brandPrimary }} />
              <Text style={styles.footerButton}>Sıfırla {this.state.selectedCount !== 0 ? "(" + this.state.selectedCount + " adet)" : null}</Text>
            </Button>
          </FooterTab>
        </Footer> */}
      </Container>
    );
  }
}

export default yedekleme;
