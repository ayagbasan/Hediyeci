// @flow
import React, { Component } from "react";
import { Platform, Dimensions, StatusBar, View, PermissionsAndroid } from "react-native";
import { Container, Content, Text, Button, Icon } from "native-base";
import Carousel from "react-native-carousel-view";

import { HediyeciBL, Colors } from "../../toolbox";

import styles from "./styles";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
type Props = {
  navigation: () => void
};
class Walkthrough extends Component {
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      isFileExist: false
    };
  }
  async requestCameraPermission() {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
        title: "Dosya okuma izni",
        message: "Hediyeci uygulaması bilgileri telefon hafızasından okumak için izin istiyor.",
        buttonNeutral: "Sonra Hatırlat",
        buttonNegative: "İptal",
        buttonPositive: "İzin VER"
      });

      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        title: "Dosya yazma izni",
        message: "Hediyeci uygulaması bilgileri telefon hafızasına kaydetmek için izin istiyor.",
        buttonNeutral: "Sonra Hatırlat",
        buttonNegative: "İptal",
        buttonPositive: "İzin VER"
      });
    } catch (err) {
      alert(err);
    }
  }

  async componentDidMount() {
    if (Platform.OS === "android") {
      await this.requestCameraPermission();
      this.checkFile();
    } else {
      this.checkFile();
    }
  }

  async checkFile() {
    let response = await HediyeciBL.existFile();
    if (response.isSuccess === true) {
      this.props.navigation.navigate("Drawer");
    } else {
      this.setState({ isFileExist: false });
    }
  }

  async createDirectory() {
    await HediyeciBL.createDirectory();
    this.checkFile();
  }
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Content>
          <View style={styles.slides}>
            <Text style={styles.apaginationText}>Hediyeci dosya kontrolü</Text>
            <Icon name="question-circle" style={styles.imageIcons} />

            <Text numberOfLines={4} style={styles.aText}>
              Konfigürasyon dosyası bulunamadı. Varsayılan konfigürasyon dosyasını oluşturmak için tıklayınız
            </Text>
            <Button transparent rounded onPress={() => this.createDirectory()} style={styles.Button}>
              <Text style={{ color: Colors.main4, fontWeight: "600" }}>Oluştur</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Walkthrough;
