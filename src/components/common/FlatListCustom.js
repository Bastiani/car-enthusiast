import * as React from "react";
import { FlatList } from "react-native";
import idx from "idx";

import FlatListItem from "./FlatListItem";

class FlatListCustom extends React.PureComponent {
  state = { selected: (new Map(): Map<string, boolean>) };

  _keyExtractor = (item, index) => item.id;

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
      key={idx(item, _ => _.id)}
      id={idx(item, _ => _.id)}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(idx(item, _ => _.id))}
      title={item.model}
      deleteRegister={() =>
        this.props.deleteRegister({ id: idx(item, _ => _.id) })
      }
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
