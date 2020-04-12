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

export default class hakkinda extends Component {
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  //
  componentWillUnmount() {
    BackButton.backButtonHandler();
  }

  async componentDidMount() {
    BackButton.backButton(BackButton.exitApp);
    this.initialize();
  }

  async initialize() {}

  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <AymkHeader navigation={navigation} title="HAKKINDA" />
        <Content style={{ backgroundColor: Colors.white }}>
          <View>
            <View style={{ marginVertical: 60 }}>
              <Icon name="gift" style={{ fontSize: 60, alignSelf: "center", color: Colors.main1 }} />
              <Text style={{ fontSize: 26, fontWeight: "bold", alignSelf: "center", color: Colors.main1 }}>HEDİYECİ</Text>
            </View>

            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: Colors.main1 }}>
                  <Icon active name="user" />
                </Button>
              </Left>
              <Body>
                <Text note>Geliştirici</Text>
              </Body>
              <Right>
                <Text style={{ color: Colors.main1 }}>Ahmet YAĞBASAN</Text>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: Colors.main1 }}>
                  <Icon active name="envelope" />
                </Button>
              </Left>
              <Body>
                <Text note>e-Posta</Text>
              </Body>
              <Right>
                <Text style={{ color: Colors.main1 }}>ahmetyagibasan@gmail.com</Text>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: Colors.main1 }}>
                  <Icon active name="code" />
                </Button>
              </Left>
              <Body>
                <Text note>Sürüm</Text>
              </Body>
              <Right>
                <Text style={{ color: Colors.main1 }}>2.1.0</Text>
              </Right>
            </ListItem>

            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: Colors.main1 }}>
                  <Icon active name="calendar" />
                </Button>
              </Left>
              <Body>
                <Text note>Son Güncelleme</Text>
              </Body>
              <Right>
                <Text style={{ color: Colors.main1 }}>04 Nisan 2020</Text>
              </Right>
            </ListItem>
          </View>

          <View style={{ padding: 20 }}>
            <View style={styles.newsCommentContainer}>
              <Text style={styles.newsComment}>Saygıdeğer hocam Ömer Hüdai ALBAYRAKA'a ve kullanan dostlara hediye ediyorum. Dua ile..</Text>
              <Text style={styles.newsComment}>- Ahmet YAĞBASAN</Text>
            </View>
          </View>

          <View style={{ padding: 20 }}>
            <View style={styles.newsCommentContainer}>
              <Text style={styles.newsComment1}>Öneri ve değerlendirmeleriniz için mail atabilirsiniz </Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
