// @flow
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import { Container, Content, Text, Icon, View, Separator } from "native-base";
import { Constants, Colors } from "../../toolbox";

import styles from "./style";
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});
class SideBar extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Content style={styles.drawerContent}>
          <View>
            <Icon name="gift" style={{ fontSize: 60, alignSelf: "center", color: Colors.main4 }} />
            <Text style={{ fontSize: 26, fontWeight: "bold", alignSelf: "center", color: Colors.main4 }}>HEDİYECİ</Text>
          </View>
          <Separator style={{ backgroundColor: Colors.main4, height: 2, marginVertical: 20, marginHorizontal: 10 }} />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Constants.Pages.VERI_GIRISI);
            }}
            style={styles.links}
          >
            <Icon name="gift" style={styles.menuIcon} />
            <Text style={styles.linkText}>İşlem YAP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Constants.Pages.HEDIYEPAYLAS);
            }}
            style={styles.links}
          >
            <Icon name="retweet" style={styles.menuIcon} />
            <Text style={styles.linkText}>Hediye Paylaş</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Constants.Pages.KATALOG);
            }}
            style={styles.links}
          >
            <Icon name="list" style={styles.menuIcon} />
            <Text style={styles.linkText}>Kataloglar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Constants.Pages.RAPORLAMA);
            }}
            style={styles.links}
          >
            <Icon name="file" style={styles.menuIcon} />
            <Text style={styles.linkText}>Raporlama</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Constants.Pages.SIFIRLA);
            }}
            style={styles.links}
          >
            <Icon name="power-off" style={styles.menuIcon} />
            <Text style={styles.linkText}>Sıfırla</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate(Constants.Pages.YEDEKLEME);
            }}
            style={styles.links}
          >
            <Icon name="save" style={styles.menuIcon} />
            <Text style={styles.linkText}>Yedekleme</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Constants.Pages.AYARLAR);
            }}
            style={styles.links}
          >
            <Icon name="cog" style={styles.menuIcon} />
            <Text style={styles.linkText}> Ayarlar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Constants.Pages.HAKKINDA);
            }}
            style={styles.links}
          >
            <Icon name="user" style={styles.menuIcon} />
            <Text style={styles.linkText}> Hakkında</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default SideBar;
