import * as React from "react";
import { FlatList } from "react-native";

import FlatListItem from "./FlatListItem";

class FlatListCustom extends React.PureComponent {
  state = { selected: (new Map(): Map<string, boolean>) };

  _keyExtractor = item => item.date;

  _onPressItem = (id: string) => {
    this.setState(state => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });

    this.props.onItemClick(id);
  };

  _renderItem = ({ item }) => (
    <FlatListItem
      key={item.date}
      id={item.date}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.date)}
      title={item.model}
      deleteRegister={() => this.props.deleteRegister({ date: item.date })}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        {...this.props}
      />
    );
  }
}

export default FlatListCustom;
