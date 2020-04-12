// @flow
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Content, Text, View, Icon, Container, Header, Item, Input } from "native-base";
import DraggableFlatList from "react-native-draggable-flatlist";
import { Colors, Constants, Logger, HediyeciBL } from "../../toolbox";

import styles from "./styles";

class TabOne extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false
    };

    this.fontSizeHediye = HediyeciBL.PARSER.getNumber(Constants.Common.AYARLAR, "fontHediye");
    this.fontSizeZiyaret = HediyeciBL.PARSER.getNumber(Constants.Common.AYARLAR, "fontZiyaret");
  }

  componentDidMount() {}

  openEditPanel(value) {
    this.props.openEditPanel(value, true);
  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <TouchableOpacity
        style={[styles.itemContainer, { backgroundColor: isActive ? Colors.brandPrimary : Colors.white }]}
        onLongPress={move}
        onPressOut={moveEnd}
        onPress={() => this.openEditPanel(item)}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Icon
            name="gift"
            style={{
              color: Colors.brandPrimaryLight,
              fontSize: this.fontSizeHediye,
              marginTop: 2,
              marginRight: 10
            }}
          />

          <Text numberOfLines={1} style={[styles.itemContent, { fontSize: this.fontSizeHediye }, { color: isActive ? Colors.white : Colors.brandPrimary }]}>
            {item[1]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // moveEnd = ({ data, to, from, row }) => {
  //   this.props.DATA.splice(from, 1);
  //   this.props.DATA.splice(to, 0, row);
  // };

  render() {
    return (
      <Container style={{ paddingTop: 15, backgroundColor: "white" }}>
        <Content bounces={false}>
          <View>
            <DraggableFlatList
              bounces={false}
              style={{ flex: 1 }}
              data={this.props.DATA}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `draggable-item-${item}`}
              scrollPercent={5}
              //onMoveEnd={this.moveEnd}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default TabOne;
