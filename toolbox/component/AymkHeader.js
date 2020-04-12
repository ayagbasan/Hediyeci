// @flow
import React, { Component } from "react";
import { Text, Icon, Button, Left, Right, Body, Header } from "native-base";
import { Colors } from "../index";
class AymkHeader extends Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <Header>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon active name="bars" style={{ fontSize: 16 }} />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 8 }}> {this.props.title}</Text>
        </Body>
        <Right>
          {this.props.showRight && (
            <Button transparent onPress={() => this.props.sifilariKapat()}>
              <Icon active name="filter" style={{ fontSize: 16 }} />
              <Text style={{ marginTop: 5, marginLeft: 5 }}>{this.props.showSifir ? "Raporla" : "Aç"}</Text>
            </Button>
          )}
        </Right>
      </Header>
    );
  }
}

export default AymkHeader;
