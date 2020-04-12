// @flow
import React, { Component } from "react";
import { Alert, Switch, Slider } from "react-native";

import { Badge, View, Picker, Separator, Title, ListItem, Container, Header, Content, Text, Button, Icon, Left, Right, Body } from "native-base";
import { AymkHeader, Constants, HediyeciBL, Colors } from "../../toolbox";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";

import styles from "./styles";
const sectionName = Constants.Common.AYARLAR;
type Props = {
  navigation: () => void
};

const radio_props_Font = [
  { label: "Küçük", value: 14 },
  { label: "Normal", value: 16 },
  { label: "Büyük", value: 20 }
];

const radio_props_Siralama = [
  { label: "Katalog sırası", value: "katalog" },
  { label: "Miktara göre", value: "miktar" }
];

const radio_props_ArtaKalanDeger = [
  { label: "İlk ziyarete", value: "ilk" },
  { label: "Son ziyarete", value: "son" }
];

class ayarlar extends Component {
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      fontHediye: 15,
      fontZiyaret: 15,
      siralamaHediye: null,
      artaKalanDeger: null,
      sifirlariGoster: null,
      ekraniAcikTut: null
    };
  }
  async componentDidMount() {
    this.initialize();
  }

  async initialize() {
    await HediyeciBL.readIniFile();
    let exist = HediyeciBL.PARSER.isHaveSection(sectionName);

    if (exist) {
      let fontHediye = HediyeciBL.PARSER.getNumber(sectionName, "fontHediye");
      let fontZiyaret = HediyeciBL.PARSER.getNumber(sectionName, "fontZiyaret");
      let siralamaHediye = HediyeciBL.PARSER.get(sectionName, "siralamaHediye");
      let artaKalanDeger = HediyeciBL.PARSER.get(sectionName, "artaKalanDeger");
      let sifirlariGoster = HediyeciBL.PARSER.getBoolean(sectionName, "sifirlariGoster");
      let ekraniAcikTut = HediyeciBL.PARSER.getBoolean(sectionName, "ekraniAcikTut");

      let isLoading = false;
      this.setState({
        isLoading,
        fontHediye,
        fontZiyaret,
        siralamaHediye,
        artaKalanDeger,
        sifirlariGoster,
        ekraniAcikTut
      });
    }
  }

  kaydet = async () => {
    try {
      let exist = HediyeciBL.PARSER.isHaveSection(sectionName);

      if (exist === false) HediyeciBL.PARSER.addSection(sectionName);

      HediyeciBL.PARSER.set(sectionName, "fontHediye", this.state.fontHediye);
      HediyeciBL.PARSER.set(sectionName, "fontZiyaret", this.state.fontZiyaret);
      HediyeciBL.PARSER.set(sectionName, "siralamaHediye", this.state.siralamaHediye);
      HediyeciBL.PARSER.set(sectionName, "artaKalanDeger", this.state.artaKalanDeger);
      HediyeciBL.PARSER.set(sectionName, "sifirlariGoster", this.state.sifirlariGoster);
      HediyeciBL.PARSER.set(sectionName, "ekraniAcikTut", this.state.ekraniAcikTut);

      await HediyeciBL.writeIniFile();
    } catch (error) {
      alert(error);
    }
  };

  renderOptions = (type, options, selectedValue) => {
    let buttonList = [];

    for (const option of options) {
      let btn = null;
      if (option.value === selectedValue) {
        btn = (
          <Button small rounded style={styles.optionButton} onPress={() => this.optionSelected(type, option.value)}>
            <Text style={styles.optionButtonText}> {option.label}</Text>
          </Button>
        );
      } else {
        btn = (
          <Button small bordered rounded style={styles.optionButton} onPress={() => this.optionSelected(type, option.value)}>
            <Text style={styles.optionButtonText}> {option.label}</Text>
          </Button>
        );
      }

      buttonList.push(btn);
    }

    let container = <View style={styles.optionButtonContainer}>{buttonList}</View>;
    return container;
  };

  optionSelected = (type, value) => {
    if (type === 1)
      this.setState({ fontHediye: value }, () => {
        this.kaydet();
      });
    else if (type === 2)
      this.setState({ fontZiyaret: value }, () => {
        this.kaydet();
      });
    else if (type === 3)
      this.setState({ siralamaHediye: value }, () => {
        this.kaydet();
      });
    else if (type === 4)
      this.setState({ artaKalanDeger: value }, () => {
        this.kaydet();
      });
    else if (type === 5)
      this.setState({ sifirlariGoster: value }, () => {
        this.kaydet();
      });
    else if (type === 6)
      this.setState({ ekraniAcikTut: value }, () => {
        this.kaydet();
      });
  };

  reset = () => {
    Alert.alert(
      "UYARI",
      "Tüm bilgiler silinecektir. Uygulamaya başlangıç verileri yüklenecektir.\r\nDevam etmek istiyor musunuz?",
      [
        {
          text: "İptal",
          style: "cancel"
        },
        { text: "EVET", onPress: () => this.resetOK() }
      ],
      { cancelable: false }
    );
  };

  resetOK = async () => {
    await HediyeciBL.createDirectory();
    this.props.navigation.navigate(Constants.Pages.VERI_GIRISI);
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <AymkHeader navigation={navigation} title="AYARLAR" />
        {!this.state.isLoading && (
          <Content style={{ backgroundColor: "#fefefe" }}>
            <Separator>
              <Text style={styles.seperator}>Hediye Yazı Büyüklüğü</Text>
            </Separator>

            <View style={[styles.contentContainerDemoHediye, { backgroundColor: Colors.main4 }]}>
              <Text style={[styles.hediyeAdiDemo, { fontSize: this.state.fontHediye }]}>Salavat-ı Şerif</Text>
              <Button rounded bordered style={styles.hediyeDegerButonuDemo}>
                <Text style={[styles.hediyeDegeriDemo, { fontSize: this.state.fontHediye }]}>1250</Text>
              </Button>
            </View>

            <View style={styles.container}>
              <Slider
                style={styles.slider}
                step={1}
                minimumTrackTintColor={Colors.main1}
                maximumTrackTintColor={Colors.main4}
                thumbTintColor={Colors.main1}
                minimumValue={10}
                maximumValue={20}
                value={this.state.fontHediye}
                onValueChange={value => {
                  this.optionSelected(1, value);
                }}
              />
              <Badge style={styles.badge}>
                <Text style={styles.text}>{String(this.state.fontHediye)}</Text>
              </Badge>
            </View>

            <Separator>
              <Text style={styles.seperator}>Ziyaret Yazı Büyüklüğü</Text>
            </Separator>

            <Button rounded bordered block style={styles.listItemContainer}>
              <Text style={[{ fontSize: this.state.fontZiyaret }, styles.listItemName]}>Sevgili Peygamberimize</Text>
            </Button>

            <View style={styles.container}>
              <Slider
                style={styles.slider}
                step={1}
                minimumTrackTintColor={Colors.main1}
                maximumTrackTintColor={Colors.main4}
                thumbTintColor={Colors.main1}
                minimumValue={10}
                maximumValue={20}
                value={this.state.fontZiyaret}
                onValueChange={value => {
                  this.optionSelected(2, value);
                }}
              />
              <Badge style={styles.badge}>
                <Text style={styles.text}>{String(this.state.fontZiyaret)}</Text>
              </Badge>
            </View>
            <Separator>
              <Text style={styles.seperator}>Sıralama</Text>
            </Separator>
            {this.renderOptions(3, radio_props_Siralama, this.state.siralamaHediye)}
            <Separator>
              <Text style={styles.seperator}>Paylaşma Yöntemi</Text>
            </Separator>
            {this.renderOptions(4, radio_props_ArtaKalanDeger, this.state.artaKalanDeger)}

            <Separator>
              <Text style={styles.seperator}>Diğer</Text>
            </Separator>
            <ListItem icon>
              <Body>
                <Text style={styles.itemName}>Miktarı 0 olan hediyeleri göster</Text>
              </Body>
              <Right>
                <Switch
                  onValueChange={sifirlariGoster => {
                    this.optionSelected(5, sifirlariGoster);
                  }}
                  tintColor={Colors.brandPrimaryLight}
                  thumbTintColor={Colors.main4}
                  onTintColor={Colors.brandPrimary}
                  value={this.state.sifirlariGoster}
                />
              </Right>
            </ListItem>
            <ListItem icon>
              <Body>
                <Text style={styles.itemName}>Ekranı açık tut</Text>
              </Body>
              <Right>
                <Switch
                  onValueChange={ekraniAcikTut => {
                    this.optionSelected(6, ekraniAcikTut);
                  }}
                  tintColor={Colors.brandPrimaryLight}
                  thumbTintColor={Colors.main4}
                  onTintColor={Colors.brandPrimary}
                  value={this.state.ekraniAcikTut}
                />
              </Right>
            </ListItem>
            <Separator>
              <Text style={styles.seperator}>Uyarı</Text>
            </Separator>
            <View style={{ paddingVertical: 10 }}>
              <Button small rounded style={styles.optionButton} onPress={() => this.reset()}>
                <Text style={styles.optionButtonText}> Varsayılan "Hediyeci" dosyasını geri yükle</Text>
              </Button>
            </View>
          </Content>
        )}
      </Container>
    );
  }
}

export default ayarlar;
