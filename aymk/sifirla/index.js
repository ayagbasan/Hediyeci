import React, { Component } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { Footer, FooterTab, Badge, Separator, Container, ListItem, Header, Content, Text, Button, Icon, Item, Input, View, Left, Right, Body } from "native-base";
import Modal from "react-native-modalbox";
import styles from "./styles.js";
import { AymkHeader, Colors, BackButton, Constants, HediyeciBL } from "../../toolbox";
import NumericInput from "react-native-numeric-input";

type Props = {
  navigation: () => void
};

class sifirla extends Component {
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      tumunuSec: false,
      ziyaretListesi: [],
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
    await HediyeciBL.readIniFile();
    this.fontSizeZiyaret = HediyeciBL.PARSER.getNumber(Constants.Common.AYARLAR, "fontZiyaret");

    let ziyaretList = HediyeciBL.PARSER.items(Constants.Common.ZIYARET);
    for (let index = 0; index < ziyaretList.length; index++) {
      this.arrayHolderZiyaret.push({ optionName: ziyaretList[index][0], value: ziyaretList[index][1], selected: false });
    }

    this.arrayHolderHediye = HediyeciBL.PARSER.items(Constants.Common.HEDIYE);
    this.setState({ ziyaretListesi: this.arrayHolderZiyaret, hediyeListesi: this.arrayHolderHediye });
  }

  renderZiyaretItem = ({ item }) => {
    return (
      <Button rounded block bordered style={[styles.listItemContainer, { backgroundColor: item.selected ? Colors.main4 : null }]} onPress={() => this.ziyaretDegistirildi(item)}>
        <Text style={[{ fontSize: this.fontSizeZiyaret }, styles.listItemName]}>{item.value}</Text>

        {item.selected && <Icon name="check-circle" style={{ color: Colors.brandPrimary, fontSize: 20 }} />}
      </Button>
    );
  };

  getirHediyeAdi = optionName => {
    return HediyeciBL.PARSER.get(Constants.Common.HEDIYE, optionName, "Bilinmiyor");
  };

  ziyaretFiltrele = text => {
    const newData = this.arrayHolderZiyaret.filter(item => {
      const itemData = `${item.value.toLowerCase()}${item.value.toLowerCase()} ${item.value.toLowerCase()}`;
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ ziyaretListesi: newData });
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

  tumunuSecTemizle = () => {
    let oldStatus = this.state.tumunuSec;
    let _selectedCount = 0;
    let _ziyaretListesi = this.state.ziyaretListesi;
    for (const iterator of _ziyaretListesi) {
      iterator.selected = !this.state.tumunuSec;

      if (iterator.selected === true) _selectedCount++;
    }

    this.setState({
      ziyaretListesi: _ziyaretListesi,
      tumunuSec: !oldStatus,
      selectedCount: !oldStatus ? _ziyaretListesi.length : 0
    });
  };

  sifirlaOnay = () => {
    if (this.state.selectedCount !== 0) {
      Alert.alert(
        "Uyarı",
        "Ziyarete ait hediyelerin değeri sıfırlanacaktır. Devam etmek istiyor musunuz?",
        [
          {
            text: "İptal",
            style: "cancel"
          },
          { text: "Evet, Sıfırla", onPress: () => this.sifirla() }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("Hediyeci", "En az bir ziyaret seçiniz");
    }
  };

  sifirla = async () => {
    for (const ziyaret of this.state.ziyaretListesi) {
      if (ziyaret.selected) {
        let ziyaretinHediyeleri = HediyeciBL.PARSER.items(ziyaret.optionName);
        for (const hediye of ziyaretinHediyeleri) {
          HediyeciBL.PARSER.set(ziyaret.optionName, hediye[0], 0);
        }
      }
    }

    await HediyeciBL.writeIniFile();

    Alert.alert(
      "Hediyeci",
      "Ziyaret(leri) sıfırlama işlemi tamamlandı",
      [
        {
          text: "Kapat",
          style: "cancel",
          onPress: () => this.temizle()
        },
        { text: "Ana sayfa", onPress: () => this.props.navigation.navigate(Constants.Pages.VERI_GIRISI) }
      ],
      { cancelable: false }
    );
  };

  temizle() {
    let _ziyaretListesi = this.state.ziyaretListesi;
    for (const iterator of _ziyaretListesi) {
      iterator.selected = false;
    }
    this.setState({
      tumunuSec: false,
      selectedCount: 0,
      ziyaretListesi: _ziyaretListesi
    });
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <AymkHeader navigation={navigation} title="ZİYARET SIFIRLA" />
        <Header searchBar rounded>
          <Item>
            <Icon name="search" />
            <Input placeholder="Ziyaret ara..." onChangeText={text => this.ziyaretFiltrele(text)} />
          </Item>
          <Button
            onPress={() => {
              this.setState({ hediyeListesi: this.arrayHolderZiyaret });
            }}
          >
            <Text>Temizle</Text>
          </Button>
        </Header>
        <Content style={{ backgroundColor: "white" }}>
          <View>
            <View style={styles.containerZiyaretCombo}>
              <FlatList extraData={this.state} data={this.state.ziyaretListesi} renderItem={this.renderZiyaretItem} keyExtractor={item => item.optionName} />
            </View>
          </View>
        </Content>

        <Modal
          position="top"
          entry="top"
          isOpen={this.state.modalHediyeSec}
          onOpened={() => this.setState({ modalHediyeSec: true })}
          onClosed={() =>
            this.setState({
              modalHediyeSec: false
            })
          }
          swipeToClose={false}
          backButtonClose={true}
          backdropPressToClose={true}
          style={styles.modal}
        >
          <Header searchBar rounded>
            <Item>
              <Icon name="search" />
              <Input placeholder="Hediye ara..." onChangeText={text => this.hediyeFiltrele(text)} />
            </Item>
            <Button
              transparent
              onPress={() => {
                this.setState({ hediyeListesi: this.arrayHolderHediye });
              }}
            >
              <Text>Temizle</Text>
            </Button>
          </Header>
          <Content scrollEnabled={true} style={{ flex: 1 }}>
            <View style={{ margin: 20 }}>
              <FlatList data={this.state.hediyeListesi} renderItem={this.renderHediyeItem} keyExtractor={item => item[0]} />
            </View>
          </Content>
        </Modal>

        <Modal
          position="top"
          entry="top"
          isOpen={this.state.modalZiyaretSec}
          onOpened={() => this.setState({ modalZiyaretSec: true })}
          onClosed={() =>
            this.setState({
              modalZiyaretSec: false
            })
          }
          swipeToClose={false}
          backButtonClose={true}
          backdropPressToClose={true}
          style={styles.modal}
        >
          <Header searchBar rounded>
            <Item>
              <Icon name="search" />
              <Input placeholder="Ziyaret ara..." onChangeText={text => this.ziyaretFiltrele(text)} />
            </Item>
            <Button
              transparent
              onPress={() => {
                this.setState({ ziyaretListesi: this.arrayHolderZiyaret });
              }}
            >
              <Text>Temizle</Text>
            </Button>
          </Header>
          <Content scrollEnabled={true} style={{ flex: 1 }}>
            <View style={{ margin: 20 }}>
              <FlatList extraData={this.state} data={this.state.ziyaretListesi} renderItem={this.renderZiyaretItem} keyExtractor={item => item.optionName} />
            </View>
          </Content>
        </Modal>

        <Footer>
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
        </Footer>
      </Container>
    );
  }
}

export default sifirla;
