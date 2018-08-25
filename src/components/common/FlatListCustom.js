import * as React from 'react';
import { FlatList } from 'react-native';

import FlatListItem from './FlatListItem';

class FlatListCustom extends React.PureComponent {
  state = { selected: (new Map(): Map<string, boolean>) };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });

    this.props.onItemClick(id);
  };

  _renderItem = ({ item }) => (
    <FlatListItem
      id={item.date}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.model}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

export default FlatListCustom;
