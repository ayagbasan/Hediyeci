import React, { Component } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { Badge, Separator, Container, ListItem, Header, Content, Text, Button, Icon, Item, Input, View, Left, Right, Body } from "native-base";
import Modal from "react-native-modalbox";
import styles from "./styles.js";
import { AymkHeader, Colors, BackButton, Constants, HediyeciBL } from "../../toolbox";
import NumericInput from "react-native-numeric-input";

type Props = {
  navigation: () => void
};

class hediyePaylas extends Component {
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      modalZiyaretSec: false,
      modalHediyeSec: false,
      ziyaretListesi: [],
      hediyeListesi: [],
      secilenHediye: null,
      secilenZiyaretler: [],
      secilenZiyaretlerBaslik: null,
      hediyeMiktari: 0,
      paylastirmaTablosu: [],
      hesapSonucuOnIzleme: false
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
    let ziyaretList = HediyeciBL.PARSER.items(Constants.Common.ZIYARET);
    this.fontSizeHediye = HediyeciBL.PARSER.getNumber(Constants.Common.AYARLAR, "fontHediye");
    this.fontSizeZiyaret = HediyeciBL.PARSER.getNumber(Constants.Common.AYARLAR, "fontZiyaret");
    for (let index = 0; index < ziyaretList.length; index++) {
      this.arrayHolderZiyaret.push({ optionName: ziyaretList[index][0], value: ziyaretList[index][1], selected: false });
    }

    this.arrayHolderHediye = HediyeciBL.PARSER.items(Constants.Common.HEDIYE);
    this.setState({ ziyaretListesi: this.arrayHolderZiyaret, hediyeListesi: this.arrayHolderHediye });
  }

  renderHediyeItem = ({ item }) => {
    return (
      <Button rounded block bordered style={styles.listItemContainer} onPress={() => this.hediyeDegistirildi(item)}>
        <Text style={[{ fontSize: this.fontSizeZiyaret }, styles.listItemName]}>{item[1]}</Text>
      </Button>
    );
  };

  renderZiyaretItem = ({ item }) => {
    return (
      <Button rounded block bordered style={styles.listItemContainer} onPress={() => this.ziyaretDegistirildi(item)}>
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

  hediyeFiltrele = text => {
    const newData = this.arrayHolderHediye.filter(item => {
      const itemData = `${item[1].toLowerCase()}${item[1].toLowerCase()} ${item[1].toLowerCase()}`;
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ hediyeListesi: newData });
  };

  hediyeDegistirildi = item => {
    this.setState({
      modalHediyeSec: false,
      secilenHediye: item
    });
  };

  ziyaretDegistirildi = item => {
    let _ziyaretListesi = this.state.ziyaretListesi;
    let _secilenZiyaretler = [];
    for (const iterator of _ziyaretListesi) {
      if (iterator.optionName === item.optionName) {
        iterator.selected = !item.selected;
      }
      if (iterator.selected === true) {
        _secilenZiyaretler.push(iterator);
      }
    }

    this.setState(
      {
        ziyaretListesi: _ziyaretListesi,
        secilenZiyaretler: _secilenZiyaretler
      },
      () => {
        this.secilenZiyaretlerinAdlari();
      }
    );
  };

  secilenZiyaretlerinAdlari() {
    let selectedList = [];
    for (const iterator of this.state.secilenZiyaretler) {
      selectedList.push(iterator.value);
    }

    if (selectedList.length > 0) {
      this.setState({
        secilenZiyaretlerBaslik: selectedList.join("\r\n")
      });
    } else {
      this.setState({
        secilenZiyaretlerBaslik: null
      });
    }
  }

  paylastirHesapOnIzleme() {
    let errorList = [];
    if (this.state.secilenHediye === null) {
      errorList.push("Hediye seçiniz");
    }

    if (this.state.secilenZiyaretler.length < 2) {
      errorList.push("En az 2 adet ziyaret seçiniz");
    }

    if (this.state.hediyeMiktari === 0 || isNaN(this.state.hediyeMiktari)) {
      errorList.push("Hediye miktarı giriniz");
    }

    if (errorList.length > 0) {
      Alert.alert("Uyarı", errorList.join("\r\n"));
    } else {
      let ayarArtaKalanDeger = HediyeciBL.PARSER.get(Constants.Common.AYARLAR, "artaKalanDeger");

      let pay = parseInt(this.state.hediyeMiktari / this.state.secilenZiyaretler.length);
      let aratoplam = pay * this.state.secilenZiyaretler.length;
      let kalanDeger = this.state.hediyeMiktari - aratoplam;

      let data = [];
      let eskiDeger = 0;
      for (const z of this.state.secilenZiyaretler) {
        try {
          eskiDeger = parseInt(HediyeciBL.PARSER.get(z.optionName, this.state.secilenHediye[0], 0));
        } catch (error) {
          eskiDeger = 0;
        }
        data.push({ ziyaret: z, hediye: this.state.secilenHediye[0], deger: pay, eskiDeger: eskiDeger });
      }

      if (ayarArtaKalanDeger === "ilk") {
        data[0].deger = data[0].deger + kalanDeger;
      } else if (ayarArtaKalanDeger === "son") {
        let len = data.length - 1;
        data[len].deger = data[len].deger + kalanDeger;
      }

      this.setState({ paylastirmaTablosu: data, hesapSonucuOnIzleme: true });
    }
  }

  async paylastir() {
    for (const item of this.state.paylastirmaTablosu) {
      let ziyaretExist = HediyeciBL.PARSER.isHaveSection(item.ziyaret.optionName);
      let eskiDeger = 0;
      if (!ziyaretExist) {
        HediyeciBL.PARSER.addSection(item.ziyaret.optionName);
      }

      try {
        eskiDeger = parseInt(HediyeciBL.PARSER.get(item.ziyaret.optionName, item.hediye, 0));
      } catch (error) {
        eskiDeger = 0;
      }

      HediyeciBL.PARSER.set(item.ziyaret.optionName, item.hediye, eskiDeger + item.deger);
    }

    await HediyeciBL.writeIniFile();

    Alert.alert(
      "İşlem başarılı",
      "Hediyeyi paylaştırma işlemi tamamlandı",
      [
        {
          text: "Ana Sayfa",
          style: "cancel",
          onPress: () => this.props.navigation.navigate(Constants.Pages.VERI_GIRISI)
        },
        { text: "Yeni Paylaşım", onPress: () => this.temizle() }
      ],
      { cancelable: false }
    );
  }

  temizle() {
    this.setState({
      modalZiyaretSec: false,
      modalHediyeSec: false,
      secilenHediye: null,
      hediyeMiktari: 0,
      paylastirmaTablosu: [],
      hesapSonucuOnIzleme: false
    });
  }

  renderOnIzleme = ({ item, index }) => {
    let color = index % 2 === 0 ? "#fff" : Colors.main4;

    return (
      /*<ListItem>
        <Body>
          <Text style={{ color: Colors.brandPrimary, fontSize: this.fontSizeHediye }}>{item.ziyaret.value}</Text>
          <Text note>Mevcut Değer: {item.eskiDeger}</Text>
        </Body>
        <Right style={{ flexDirection: "row" }}>
          <Badge success>
            <Text style={{ fontSize: this.fontSizeHediye, marginTop: 3 }}>{item.deger}</Text>
          </Badge>
        </Right>
      </ListItem>*/

      <View style={[styles.contentContainer, { backgroundColor: color }]}>
        <Text style={[styles.hediyeAdi, { fontSize: this.fontSizeHediye }]}>{item.ziyaret.value}</Text>

        <Button rounded bordered style={styles.hediyeDegerButonu}>
          <Text style={[styles.hediyeDegeri, { fontSize: this.fontSizeHediye }]}>{item.deger}</Text>
        </Button>
      </View>
    );
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <AymkHeader navigation={navigation} title="HEDİYE PAYLAŞ" />

        <Content style={{ backgroundColor: "white" }}>
          {!this.state.hesapSonucuOnIzleme && (
            <View>
              <View style={styles.containerZiyaretCombo}>
                <Item rounded style={{ padding: 0, flex: 1 }}>
                  <Icon name="gift" style={styles.ziyaretIcon} />
                  <Text style={[styles.ziyaretLabel, { fontSize: this.fontSizeHediye }]}>
                    {this.state.secilenHediye != null ? this.state.secilenHediye[1] : "Hediye Seçiniz..."}
                  </Text>
                  <Button bordered style={{ borderRadius: 30 }} onPress={() => this.setState({ modalHediyeSec: true })}>
                    <Text>Seç</Text>
                  </Button>
                </Item>
              </View>
              <View style={styles.containerZiyaretCombo}>
                <Item rounded style={{ padding: 0, flex: 1 }}>
                  <Icon name="gift" style={styles.ziyaretIcon} />
                  <Text style={[styles.ziyaretLabel, { fontSize: this.fontSizeHediye }]}>
                    {this.state.secilenZiyaretlerBaslik != null ? this.state.secilenZiyaretlerBaslik : "Ziyaret seçiniz..."}
                  </Text>
                  <Button bordered style={{ borderRadius: 30 }} onPress={() => this.setState({ modalZiyaretSec: true })}>
                    <Text>Seç</Text>
                  </Button>
                </Item>
              </View>

              <View style={[styles.containerZiyaretCombo, { marginTop: 10, alignItems: "center", alignSelf: "center", flex: 1 }]}>
                <NumericInput
                  initValue={this.state.hediyeMiktari}
                  onChange={value => {
                    this.setState({ hediyeMiktari: value });
                  }}
                  totalWidth={300}
                  totalHeight={50}
                  iconSize={20}
                  step={1}
                  valueType="integer"
                  rounded
                  inputStyle={{ fontSize: 30, fontWeight: "bold" }}
                  editable={true}
                  textColor={Colors.brandPrimary}
                  iconStyle={{ color: Colors.main2 }}
                  rightButtonBackgroundColor={Colors.main4.toString()}
                  leftButtonBackgroundColor={Colors.main4.toString()}
                />
              </View>

              <View style={styles.optionButtonContainer}>
                <Button rounded style={styles.optionButton} onPress={() => this.paylastirHesapOnIzleme()}>
                  <Text style={styles.optionButtonText}> Hesapla</Text>
                </Button>
              </View>
            </View>
          )}

          {this.state.hesapSonucuOnIzleme === true && (
            <View>
              <Separator styles={{ height: 50 }}>
                <Text style={styles.seperator}>"{this.state.secilenHediye[1]}" hediyesi paylaştırılıyor </Text>
              </Separator>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <FlatList data={this.state.paylastirmaTablosu} renderItem={this.renderOnIzleme} keyExtractor={item => item.ziyaret} />
              </View>
              <View style={styles.containerZiyaretCombo}>
                <Button rounded style={[styles.optionButton, { flex: 1, backgroundColor: Colors.main4 }]} onPress={() => this.setState({ hesapSonucuOnIzleme: false })}>
                  <Text style={styles.optionButtonText}> Geri</Text>
                </Button>

                <Button rounded style={[styles.optionButton, { flex: 2 }]} onPress={() => this.paylastir()}>
                  <Text style={styles.optionButtonText}> Paylaştır</Text>
                </Button>
              </View>
            </View>
          )}
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
      </Container>
    );
  }
}

export default hediyePaylas;
