import React, { Component } from "react";
import { Keyboard, FlatList, PermissionsAndroid, TouchableOpacity, TextInput, Clipboard } from "react-native";
import { Container, Header, Content, Text, Button, Icon, Item, Input, View, Left, Right, Body, Toast, Fab } from "native-base";
import Modal from "react-native-modalbox";
import styles from "./styles.js";
import { AymkHeader, Colors, BackButton, Constants, HediyeciBL } from "../../toolbox";
import NumericInput from "react-native-numeric-input";
import DoneButton from "react-native-keyboard-done-button";
import KeepAwake from "react-native-keep-awake";

type Props = {
  navigation: () => void
};
class veriGirisi extends Component {
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      modalZiyaretSec: false,
      modalHediyeGiris: false,
      ziyaretListesi: [],
      ziyaretinHediyeleri: [],
      secilenZiyaret: null,
      secilenHediyeAdi: null,
      secilenHediyeOptionName: null,
      secilenHediyeEklenecekDeger: 0,
      secilenHediyeSuAnkiDeger: 0,
      raporModu: true,
      hediyeFiltreKey: null
    };

    this.arrayholderZiyaretListesi = [];
    this.arrayholderZiyaretinHediyeleri = [];
    this.fontSizeHediye = null;
    this.fontSizeZiyaret = null;
  }

  componentWillUnmount() {
    BackButton.backButtonHandler();
    KeepAwake.deactivate();
  }

  async componentDidMount() {
    this.initialize();
    BackButton.backButton(BackButton.exitApp);
  }

  initialize = async () => {
    try {
      await HediyeciBL.readIniFile();
      this.fontSizeHediye = HediyeciBL.PARSER.getNumber(Constants.Common.AYARLAR, "fontHediye");
      this.fontSizeZiyaret = HediyeciBL.PARSER.getNumber(Constants.Common.AYARLAR, "fontZiyaret");

      this.arrayholderZiyaretListesi = HediyeciBL.PARSER.items(Constants.Common.ZIYARET);
      this.setState({ ziyaretListesi: this.arrayholderZiyaretListesi });
      this.ziyaretDegistirildi(this.arrayholderZiyaretListesi[0]);
      this.checkScreenAwake();
    } catch (error) {
      alert(error);
    }
  };

  checkScreenAwake() {
    let ekraniAcikTut = HediyeciBL.PARSER.getBoolean(Constants.Common.AYARLAR, "ekraniAcikTut");

    if (ekraniAcikTut) {
      KeepAwake.activate();
    } else {
      KeepAwake.deactivate();
    }
  }
  renderZiyaretItem = ({ item }) => {
    let isActiveColor = Colors.main4;
    if (item.length === 3) isActiveColor = item[2] ? Colors.brandSuccess : Colors.main4;

    return (
      <Button rounded bordered block style={styles.listItemContainer} onPress={() => this.ziyaretDegistirildi(item)}>
        <Icon name="gift" style={{ color: isActiveColor, marginRight: 10 }}></Icon>
        <Text style={[{ fontSize: this.fontSizeZiyaret }, styles.listItemName]}>{item[1]}</Text>
      </Button>
    );
  };

  renderHediyeItem = ({ item, index }) => {
    let hediyeAdi = this.getirHediyeAdi(item[0]);
    let color = index % 2 === 0 ? "#fff" : "#eee";

    return (
      <TouchableOpacity onPress={() => this.hediyeGirisi(item, hediyeAdi)}>
        <View style={[styles.contentContainer, { backgroundColor: color }]}>
          <Text style={[styles.hediyeAdi, { fontSize: this.fontSizeHediye }]}>{hediyeAdi}</Text>

          <Button rounded bordered style={styles.hediyeDegerButonu} onPress={() => this.hediyeGirisi(item, hediyeAdi)}>
            <Text style={[styles.hediyeDegeri, { fontSize: this.fontSizeHediye }]}>{HediyeciBL.formatNumber(parseInt(item[1]))}</Text>
          </Button>
        </View>
      </TouchableOpacity>
    );
  };

  getirHediyeAdi = optionName => {
    return HediyeciBL.PARSER.get(Constants.Common.HEDIYE, optionName, "Bilinmiyor");
  };

  hediyeGirisi = (item, hediyeAdi) => {
    this.setState({
      secilenHediyeAdi: hediyeAdi,
      secilenHediyeOptionName: item[0],
      secilenHediyeEklenecekDeger: 0,
      secilenHediyeSuAnkiDeger: parseInt(item[1]),
      modalHediyeGiris: true
    });
  };

  hediyeYeniDegerKaydet = async () => {
    this.setState({ modalHediyeGiris: false });
    let sectionName = this.state.secilenZiyaret[0];
    let optionName = this.state.secilenHediyeOptionName;
    let value = this.state.secilenHediyeEklenecekDeger + this.state.secilenHediyeSuAnkiDeger;

    HediyeciBL.PARSER.set(sectionName, optionName, value);
    await HediyeciBL.writeIniFile();
    this.ziyaretDegistirildi(this.state.secilenZiyaret);

    Keyboard.dismiss;
  };

  ziyaretFiltrele = text => {
    const newData = this.arrayholderZiyaretListesi.filter(item => {
      const itemData = `${item[1].toUpperCase()}${item[1].toUpperCase()} ${item[1].toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ ziyaretListesi: newData });
  };

  hediyeFiltre = () => {
    if (this.state.hediyeFiltreKey != null) {
      const filterKey = this.state.hediyeFiltreKey.toUpperCase().trim();
      const filteredHediyeList = this.arrayholderZiyaretinHediyeleri.filter(item => {
        let hediyeAdi = this.getirHediyeAdi(item[0]).toUpperCase();
        const itemData = `${hediyeAdi.toUpperCase()}${hediyeAdi.toUpperCase()} ${hediyeAdi.toUpperCase()}`;
        return itemData.indexOf(filterKey) > -1;
      });

      this.setState({ ziyaretinHediyeleri: filteredHediyeList });
    } else {
      this.setState({ ziyaretinHediyeleri: this.arrayholderZiyaretinHediyeleri });
    }
  };

  ziyaretDegistirildi = item => {
    this.setState({
      modalZiyaretSec: false
    });

    this.arrayholderZiyaretinHediyeleri = HediyeciBL.PARSER.items(item[0]);

    let totalItemCount = 0;
    for (let i = 0; i < this.arrayholderZiyaretinHediyeleri.length; i++) {
      totalItemCount += parseInt(this.arrayholderZiyaretinHediyeleri[i][1]);
    }

    item[2] = totalItemCount == 0 ? false : true;

    this.setState({ secilenZiyaret: item });

    if (this.state.hediyeFiltreKey != null) {
      this.hediyeFiltre();
    } else {
      this.setState({ ziyaretinHediyeleri: this.arrayholderZiyaretinHediyeleri });
    }
  };

  sifilariKapat = () => {
    let mod = !this.state.raporModu;
    let itemList = [];

    if (mod === true) {
      this.setState({ ziyaretinHediyeleri: this.arrayholderZiyaretinHediyeleri, raporModu: mod });
    } else {
      for (const item of this.arrayholderZiyaretinHediyeleri) {
        if (parseInt(item[1]) !== 0) {
          itemList.push(item);
        }
      }

      this.setState({ ziyaretinHediyeleri: itemList, raporModu: mod });

      Toast.show({
        text: "Değeri 0 olan hediyeler kapatıldı",
        textStyle: { color: "white" },
        buttonText: "Tamam",
        type: "warning"
      });
    }
  };

  ziyaretiKopyala = copyAllZiyaret => {
    if (!copyAllZiyaret) {
      let rows = [];
      rows.push(this.state.secilenZiyaret[1].toUpperCase());
      rows.push("-----------------------------");
      for (let i = 0; i < this.arrayholderZiyaretinHediyeleri.length; i++) {
        let hediyeAdi = this.getirHediyeAdi(this.arrayholderZiyaretinHediyeleri[i][0]);
        let count = parseInt(this.arrayholderZiyaretinHediyeleri[i][1]);
        if (count > 0) rows.push(`${count}\t= ${hediyeAdi}`);
      }

      let copied = rows.join("\n");

      Clipboard.setString(copied);

      Toast.show({
        text: "Ziyaret bilgileri kopyalandı",
        textStyle: { color: "white" },
        type: "success"
      });
    } else {
      let rows = [];

      for (let i = 0; i < this.arrayholderZiyaretListesi.length; i++) {
        const Z = this.arrayholderZiyaretListesi[i];
        let hediyeList = HediyeciBL.PARSER.items(Z[0]);

        let hediyeRows = [];
        for (let j = 0; j < hediyeList.length; j++) {
          const H = hediyeList[j];
          let hediyeAdi = this.getirHediyeAdi(H[0]);
          let count = parseInt(H[1]);
          if (count > 0) hediyeRows.push(`${count}\t= ${hediyeAdi}`);
        }

        if (hediyeRows.length > 0) {
          rows.push(Z[1].toUpperCase());
          rows.push("-----------------------------");
          rows = rows.concat(hediyeRows);
          rows.push("\n\n");
        }
      }

      let copied = rows.join("\n");

      Clipboard.setString(copied);

      Toast.show({
        text: "Tüm ziyaret bilgileri kopyalandı",
        textStyle: { color: "white" },
        type: "danger"
      });
    }
  };

  ziyaretOpenPopup = () => {
    this.arrayholderZiyaretListesi.forEach(ziyaret => {
      let hediyeList = HediyeciBL.PARSER.items(ziyaret[0]);
      let value = 0;
      for (let i = 0; i < hediyeList.length; i++) {
        value += parseInt(hediyeList[i][1]);
      }
      ziyaret[2] = value > 0 ? true : false;
    });

    this.setState({ modalZiyaretSec: true });
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <Container style={{ backgroundColor: "#fff" }}>
        {this.state.secilenZiyaret != null && (
          <Header style={{ paddingBottom: 10, height: 80, paddingTop: 20 }}>
            <Left style={{ flex: 2, flexDirection: "row", marginRight: 10 }}>
              <Button transparent onPress={() => navigation.openDrawer()}>
                <Icon active name="bars" style={{ fontSize: 16 }} />
              </Button>
              <Icon
                name="gift"
                style={{
                  marginLeft: 15,
                  marginTop: 15,
                  marginRight: 8,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: this.state.secilenZiyaret[2] ? Colors.brandSuccess : Colors.main4
                }}
              ></Icon>

              <Text numberOfLines={2} style={{ flex: 1, marginTop: 12, fontSize: 18, fontWeight: "bold", color: Colors.main4 }}>
                {this.state.secilenZiyaret[1]}
              </Text>
            </Left>
            <Right style={{ flex: 1 }}>
              <Button warning onPress={() => this.sifilariKapat()} style={{ marginRight: 10, borderRadius: 40, height: 40 }}>
                <Icon name="check-circle" style={{ fontSize: 20 }}></Icon>
              </Button>

              <Button success onPress={() => this.ziyaretiKopyala(false)} onLongPress={() => this.ziyaretiKopyala(true)} style={{ marginRight: 10, borderRadius: 40, height: 40 }}>
                <Icon name="copy" style={{ fontSize: 20 }}></Icon>
              </Button>

              <Button info onPress={() => this.ziyaretOpenPopup()} style={{ marginRight: 10, borderRadius: 40, height: 40 }}>
                <Icon name="list" style={{ fontSize: 20 }}></Icon>
              </Button>
            </Right>
          </Header>
        )}
        <Content>
          <View>
            <Header searchBar rounded style={{ marginTop: -10, backgroundColor: "transparent" }}>
              <Item>
                <Icon name="search" />
                <Input
                  placeholder="hediye filtrele"
                  value={this.state.hediyeFiltreKey}
                  onChangeText={hediyeFiltreKey =>
                    this.setState({ hediyeFiltreKey }, () => {
                      this.hediyeFiltre(hediyeFiltreKey);
                    })
                  }
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ hediyeFiltreKey: null }, () => {
                      this.hediyeFiltre(null);
                    })
                  }
                >
                  <Icon name="times" style={styles.ziyaretIcon} />
                </TouchableOpacity>
              </Item>
            </Header>
            <FlatList data={this.state.ziyaretinHediyeleri} renderItem={this.renderHediyeItem} keyExtractor={item => item[0]} />
          </View>
        </Content>

        <Modal
          position="center"
          entry="bottom"
          coverScreen={false}
          backdropOpacity={0.9}
          isOpen={this.state.modalZiyaretSec}
          onOpened={() => this.setState({ modalZiyaretSec: true })}
          onClosed={() =>
            this.setState({
              modalZiyaretSec: false
            })
          }
          swipeToClose={true}
          backButtonClose={true}
          backdropPressToClose={true}
        >
          <Header searchBar rounded>
            <Item>
              <Icon name="search" />
              <Input placeholder="Ziyaret ara..." onChangeText={text => this.ziyaretFiltrele(text)} />
            </Item>
            <Button
              onPress={() => {
                this.setState({ ziyaretListesi: this.arrayholderZiyaretListesi });
              }}
            >
              <Text>Temizle</Text>
            </Button>
            <Button
              onPress={() => {
                this.setState({ modalZiyaretSec: false });
              }}
            >
              <Text>KAPAT</Text>
            </Button>
          </Header>

          <Content scrollEnabled={true} style={{ flex: 1 }}>
            <View style={{ margin: 20 }}>
              <FlatList data={this.state.ziyaretListesi} renderItem={this.renderZiyaretItem} keyExtractor={item => item[0]} />
            </View>
          </Content>
        </Modal>

        <Modal
          position="top"
          entry="top"
          backButtonClose={true}
          isOpen={this.state.modalHediyeGiris}
          onOpened={() => this.setState({ modalHediyeGiris: true })}
          onClosed={() =>
            this.setState({
              modalHediyeGiris: false
            })
          }
          swipeToClose={false}
          backButtonClose={true}
          backdropPressToClose={true}
          style={styles.modal}
        >
          <View style={{ margin: 0, padding: 0, flexDirection: "row", backgroundColor: Colors.main3 }}>
            <Body style={{ flex: 3, padding: 10 }}>
              <Text numberOfLines={1} style={styles.hediyeModelHeader}>
                {this.state.secilenHediyeAdi}
              </Text>
            </Body>
          </View>
          <Content scrollEnabled={false} style={{ flex: 1 }}>
            <View style={{ alignItems: "center" }}>
              <Item rounded style={styles.inputContent}>
                <Text style={styles.inputLabels}>Mevcut Değer</Text>
                <Text style={styles.inputItems}>{HediyeciBL.formatNumber(this.state.secilenHediyeSuAnkiDeger)}</Text>
              </Item>

              <Item rounded style={styles.inputContent}>
                <Text style={styles.inputLabels}>Miktar</Text>

                <TextInput
                  placeholder="0"
                  autoFocus={true}
                  keyboardType={"numeric"}
                  placeholderTextColor={Colors.main3}
                  returnKeyType={"done"}
                  style={styles.inputEklenecekDeger}
                  onSubmitEditing={event => {
                    this.hediyeYeniDegerKaydet();
                  }}
                  onChangeText={value => {
                    this.setState({ secilenHediyeEklenecekDeger: value == "" ? 0 : parseInt(value) });
                  }}
                />
              </Item>
              <Item rounded style={styles.inputContent}>
                <Text style={styles.inputLabels}>Yeni Değer</Text>
                <Text style={styles.inputItems}>{HediyeciBL.formatNumber(this.state.secilenHediyeSuAnkiDeger + this.state.secilenHediyeEklenecekDeger)}</Text>
              </Item>
            </View>
            {/* <View style={styles.optionButtonContainer}>
              <Button rounded style={styles.optionButton} onPress={() => this.hediyeYeniDegerKaydet()}>
                <Text style={styles.optionButtonText}> Kaydet</Text>
              </Button>
            </View> */}
          </Content>
        </Modal>
      </Container>
    );
  }
}

export default veriGirisi;
