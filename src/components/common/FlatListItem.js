import * as React from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import Swipeout from "react-native-swipeout";

class ListItem extends React.PureComponent {
  _onPress = () => {
    const { id, onPressItem } = this.props;
    onPressItem(id);
  };

  render() {
    const { selected, title, deleteRegister } = this.props;
    const textColor = selected ? "red" : "black";
    const swipeProps = {
      autoClose: true,
      right: [
        {
          onPress: async () => deleteRegister(),
          text: "Delete",
          type: "delete"
        }
      ]
    };
    return (
      <Swipeout {...swipeProps}>
        <TouchableOpacity onPress={this._onPress}>
          <View>
            <Text style={{ color: textColor }}>{title}</Text>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

export default ListItem;
