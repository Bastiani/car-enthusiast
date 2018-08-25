import * as React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

class ListItem extends React.PureComponent {
  _onPress = () => {
    const { id, onPressItem } = this.props;
    onPressItem(id);
  };

  render() {
    const { selected, title } = this.props;
    const textColor = selected ? 'red' : 'black';
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: textColor }}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ListItem;
