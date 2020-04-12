/* eslint-disable curly */
// @flow
import React, { Component } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Input, Content, View, Container, Button, Icon, Tabs, Tab, Text, Footer, FooterTab, Textarea, Header, Item } from "native-base";
import { AymkHeader, Colors, BackButton, Constants, HediyeciBL } from "../../toolbox";
import Modal from "react-native-modalbox";
import styles from "./styles.js";

import TabOne from "./tabOne";
import TabTwo from "./tabTwo";
type Props = {
  navigation: () => void
};

class katalog extends Component {
  props: Props;

  constructor(props: Props) {
    super(props);
    this.openPopupWindow = this.openPopupWindow.bind(this);
    this.state = {
      selectedTab: 0,
      selectedKatalogTip: Constants.Type.HEDIYE,
      selectedSection: Constants.Common.HEDIYE,
      optionName: null,
      optionValue: null,
      isEditMode: false,
      openModal: false,
      hediyeListesi: [],
      ziyaretListesi: [],
      importMode: false,
      filterKey: null
    };

    this.arrayholderZiyaretListesi = [];
    this.arrayholderHediyeListesi = [];
  }

  refreshValues() {
    this.setState({ hediyeListesi: HediyeciBL.PARSER.items(Constants.Common.HEDIYE), ziyaretListesi: HediyeciBL.PARSER.items(Constants.Common.ZIYARET) });
  }

  async componentDidMount() {
    BackButton.backButton(BackButton.exitApp);
    this.initialize();
  }

  async initialize() {
    let response = await HediyeciBL.readIniFile();

    if (HediyeciBL.PARSER.isHaveSection(Constants.Common.HEDIYE)) {
      this.arrayholderHediyeListesi = HediyeciBL.PARSER.items(Constants.Common.HEDIYE);
      this.setState({ hediyeListesi: this.arrayholderHediyeListesi });
    } else {
      HediyeciBL.PARSER.addSection(Constants.Common.HEDIYE);
      await HediyeciBL.writeIniFile();
    }
    if (HediyeciBL.PARSER.isHaveSection(Constants.Common.ZIYARET)) {
      this.arrayholderZiyaretListesi = HediyeciBL.PARSER.items(Constants.Common.ZIYARET);
      this.setState({ ziyaretListesi: this.arrayholderZiyaretListesi });
    } else {
      HediyeciBL.PARSER.addSection(Constants.Common.ZIYARET);
      await HediyeciBL.writeIniFile();
    }
  }

  hediyeListesiniDoldur = () => {
    let key = this.state.filterKey;
    if (key === null) {
      this.setState({ hediyeListesi: this.arrayholderHediyeListesi });
    } else {
      const filteredHediye = this.arrayholderHediyeListesi.filter(item => {
        const itemData = `${item[1].toUpperCase()}${item[1].toUpperCase()} ${item[1].toUpperCase()}`;
        const textData = key.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      this.setState({ hediyeListesi: filteredHediye });
    }
  };

  ziyaretListesiniDoldur = () => {
    let key = this.state.filterKey;
    if (key === null) {
      this.setState({ ziyaretListesi: this.arrayholderZiyaretListesi });
    } else {
      const filteredList = this.arrayholderZiyaretListesi.filter(item => {
        const itemData = `${item[1].toUpperCase()}${item[1].toUpperCase()} ${item[1].toUpperCase()}`;
        const textData = key.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      this.setState({ ziyaretListesi: filteredList });
    }
  };

  listeyiDoldur = filterKey => {
    this.setState({ filterKey }, () => {
      if (this.state.selectedKatalogTip === Constants.Type.HEDIYE) {
        this.hediyeListesiniDoldur();
      } else if (this.state.selectedKatalogTip === Constants.Type.ZIYARET) {
        this.ziyaretListesiniDoldur();
      }
    });
  };

  temizleFiltre = () => {
    //this.listeyiDoldur(null);
  };

  async changeTab(data) {
    this.setState({
      selectedTab: data.i,
      selectedKatalogTip: data.ref.props.tip,
      selectedSection: data.ref.props.baslik
    });
    this.listeyiDoldur(null);
  }

  openPopupWindow(value, isEditMode, importMode) {
    if (isEditMode === true) this.setState({ importMode: importMode, isEditMode: isEditMode, optionName: value[0], optionValue: value[1], openModal: true });
    else this.setState({ importMode: importMode, isEditMode: isEditMode, optionName: null, optionValue: null, openModal: true });
  }

  async katalogEkleDuzenle() {
    let optionValue = this.state.optionValue;
    let optionName = this.state.optionName;
    let isEdit = this.state.isEditMode;
    let importMode = this.state.importMode;

    if (!importMode) {
      if (isEdit === true) {
        HediyeciBL.PARSER.set(this.state.selectedSection, optionName, optionValue);
        await HediyeciBL.writeIniFile();
        this.refreshValues();
        this.closePopupWindow();
      } else {
        if (this.state.selectedKatalogTip === Constants.Type.HEDIYE) {
          this.hediyeEkle(optionValue);
        } else if (this.state.selectedKatalogTip === Constants.Type.ZIYARET) {
          this.ziyaretEkle(optionValue);
        }
      }
    } else {
      let separators = ["\\,", "\\-", "\\_", "\\-", "\\;", "\\:", "\\\n"];
      var tokens = optionValue.split(new RegExp(separators.join("|"), "g"));

      let newItems = [];
      let isExistItemList = [];
      for (var i = 0; i < tokens.length; i++) {
        let item = HediyeciBL.replaceOptionName(tokens[i]);
        if (item.length > 0 && newItems.indexOf(item) === -1) {
          let exist = HediyeciBL.PARSER.isHaveOption(this.state.selectedSection, item);
          if (!exist) {
            newItems.push(item);
          } else {
            isExistItemList.push(item);
          }
        }
      }

      for (const item of newItems) {
        if (this.state.selectedKatalogTip === Constants.Type.HEDIYE) {
          this.hediyeEkle(item);
        } else if (this.state.selectedKatalogTip === Constants.Type.ZIYARET) {
          this.ziyaretEkle(item);
        }
      }
    }
  }

  async katalogSil() {
    let optionValue = this.state.optionValue;
    let optionName = this.state.optionName;

    if (this.state.selectedKatalogTip === Constants.Type.HEDIYE) {
      this.hediyeSil(optionName, optionValue);
    } else if (this.state.selectedKatalogTip === Constants.Type.ZIYARET) {
      this.ziyaretSil(optionName, optionValue);
    }
  }

  async hediyeSil(optionName, optionValue) {
    try {
      let sectionList = [];
      let sectionOptionValueList = [];
      for (const ziyaret of this.state.ziyaretListesi) {
        let isExist = HediyeciBL.PARSER.isHaveOption(ziyaret[0], optionName);
        if (isExist) {
          sectionOptionValueList.push(ziyaret[0]);
          sectionList.push(ziyaret[1]);
        }
      }

      if (sectionList.length > 0) {
        Alert.alert(
          optionValue,
          '"' + sectionList.join(", ") + '" ziyaretlerinde hediye kaydı bulunuyor. Devam etmek istiyor musunuz?',
          [
            {
              text: "İptal",
              style: "cancel"
            },
            { text: "Sil", onPress: () => this.hediyeSilOnay(sectionOptionValueList, optionName) }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          optionValue,
          "Hediyeyi silmek istiyor musunuz?",
          [
            {
              text: "İptal",
              style: "cancel"
            },
            { text: "Sil", onPress: () => this.hediyeSilOnay(sectionOptionValueList, optionName) }
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      alert(error);
    }
  }

  async hediyeSilOnay(sectionList, optionName) {
    for (const section of sectionList) {
      HediyeciBL.PARSER.removeOption(section, optionName);
    }

    HediyeciBL.PARSER.removeOption(Constants.Common.HEDIYE, optionName);
    await HediyeciBL.writeIniFile();

    this.closePopupWindow();
  }

  async ziyaretSil(optionName, optionValue) {
    try {
      Alert.alert(
        optionValue,
        "Ziyareti silmek istiyor musunuz?",
        [
          {
            text: "İptal",
            style: "cancel"
          },
          { text: "Sil", onPress: () => this.ziyaretSilOnay(optionName, optionValue) }
        ],
        { cancelable: false }
      );
    } catch (error) {
      alert(error);
    }
  }

  async ziyaretSilOnay(optionName, optionValue) {
    HediyeciBL.PARSER.removeSection(optionName);
    HediyeciBL.PARSER.removeOption(Constants.Common.ZIYARET, optionName);
    await HediyeciBL.writeIniFile();
    this.closePopupWindow();
  }

  async hediyeEkle(optionValue) {
    let optionName = HediyeciBL.replaceOptionName(optionValue);
    HediyeciBL.PARSER.set(Constants.Common.HEDIYE, optionName, optionValue);

    for (const ziyaret of this.state.ziyaretListesi) {
      if (!HediyeciBL.PARSER.isHaveSection(ziyaret[0])) HediyeciBL.PARSER.addSection(ziyaret[0]);

      HediyeciBL.PARSER.set(ziyaret[0], optionName, 0);
    }
    await HediyeciBL.writeIniFile();
    this.setState({ hediyeListesi: HediyeciBL.PARSER.items(Constants.Common.HEDIYE) });
    this.closePopupWindow();
  }

  async ziyaretEkle(optionValue) {
    let optionName = HediyeciBL.replaceOptionName(optionValue);
    HediyeciBL.PARSER.set(Constants.Common.ZIYARET, optionName, optionValue);
    HediyeciBL.PARSER.addSection(optionName);

    for (const hediye of this.state.hediyeListesi) {
      HediyeciBL.PARSER.set(optionName, hediye[0], 0);
    }
    await HediyeciBL.writeIniFile();
    this.setState({ ziyaretListesi: HediyeciBL.PARSER.items(Constants.Common.ZIYARET) });
    this.closePopupWindow();
  }

  closePopupWindow() {
    this.setState({ openModal: false, optionName: null, optionValue: null, isEditMode: false });
    this.refreshValues();
  }

  render() {
    return (
      <Container>
        <AymkHeader navigation={this.props.navigation} title={"KATALOGLAR"} />
        <Header searchBar rounded style={{ marginTop: 0, backgroundColor: "transparent" }}>
          <Item>
            <Icon name="search" />
            <Input placeholder="filtrele" value={this.state.filterKey} onChangeText={this.listeyiDoldur.bind(this)} />
            <TouchableOpacity onPress={() => this.temizleFiltre()}>
              <Icon name="times" style={styles.ziyaretIcosn} />
            </TouchableOpacity>
          </Item>
        </Header>
        <Tabs tabStyle={{ backgroundColor: Colors.main4 }} onChangeTab={data => this.changeTab(data)} initialPage={0}>
          <Tab heading="Hediyeler" tip={Constants.Type.HEDIYE} baslik={Constants.Common.HEDIYE}>
            <TabOne openEditPanel={this.openPopupWindow} DATA={this.state.hediyeListesi} />
          </Tab>
          <Tab heading="Ziyaretler" tip={Constants.Type.ZIYARET} baslik={Constants.Common.ZIYARET}>
            <TabTwo openEditPanel={this.openPopupWindow} DATA={this.state.ziyaretListesi} />
          </Tab>
        </Tabs>

        <Footer>
          <FooterTab>
            {/* <Button full light>
              <Icon name="sort" style={{ color: Colors.brandPrimary }} />
              <Text style={{ color: Colors.brandPrimary }}>Sırala</Text>
            </Button> */}
            <Button full light onPress={() => this.openPopupWindow(null, false, true)}>
              <Icon name="upload" style={{ color: Colors.brandPrimary }} />
              <Text style={styles.footerButton}>İçe Aktar</Text>
            </Button>
            <Button full light onPress={() => this.openPopupWindow(null, false, false)}>
              <Icon name="plus-circle" style={{ color: Colors.brandPrimary }} />
              <Text style={styles.footerButton}>Yeni</Text>
            </Button>
          </FooterTab>
        </Footer>

        <Modal
          position="top"
          entry="top"
          isOpen={this.state.openModal}
          onOpened={() => this.setState({ openModal: true })}
          onClosed={() =>
            this.setState({
              openModal: false
            })
          }
          swipeToClose={true}
          backButtonClose={true}
          backdropPressToClose={false}
          /*style={styles.modal}*/
        >
          <Content scrollEnabled={false} style={{ flex: 1, padding: 4 }}>
            <View style={styles.modalContentBox}>
              <Text style={[styles.modalHeader]}>
                {this.state.selectedSection} {this.state.importMode ? "içe aktar" : null}
              </Text>
            </View>

            <View style={styles.modalRow}>
              {this.state.importMode && (
                <Textarea
                  rowSpan={10}
                  bordered
                  placeholder={this.state.selectedSection + " adı giriniz"}
                  style={styles.modalValue}
                  onChangeText={optionValue => this.setState({ optionValue })}
                  value={this.state.optionValue}
                />
              )}
              {!this.state.importMode && (
                <Input
                  placeholder={this.state.selectedSection + " adı giriniz"}
                  style={styles.modalValue}
                  onChangeText={optionValue => this.setState({ optionValue })}
                  value={this.state.optionValue}
                />
              )}
            </View>

            <View style={styles.buttonsContainer}>
              <Button
                rounded
                onPress={() => {
                  this.setState({ openModal: false });
                }}
                style={styles.btnModalClose}
              >
                <Text style={styles.btnModalText}>Kapat</Text>
              </Button>

              {this.state.isEditMode && (
                <Button rounded onPress={() => this.katalogSil()} style={styles.btnModalDelete}>
                  <Text style={styles.btnModalText}>Sil</Text>
                </Button>
              )}

              <Button rounded onPress={() => this.katalogEkleDuzenle()} style={styles.btnModalKaydet}>
                <Text style={styles.btnModalText}>{this.state.isEditMode ? "Değiştir" : "Kaydet"}</Text>
              </Button>
            </View>
          </Content>
        </Modal>
      </Container>
    );
  }
}

export default katalog;
