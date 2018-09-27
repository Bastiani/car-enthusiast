import * as React from "react";
import { Text, Alert } from "react-native";
import Swipeout from "react-native-swipeout";
import styled from "styled-components/native";

const ButtonStyled = styled.TouchableOpacity`
  flex: 1;
  background-color: #fdfffc;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: black;
  border-top-color: black;
  border-top-width: 1px;
`;

class ListItem extends React.PureComponent {
  _onPress = () => {
    const { id, onPressItem } = this.props;
    onPressItem(id);
  };

  render() {
    const { title, deleteRegister } = this.props;
    const swipeProps = {
      backgroundColor: "#fdfffc",
      autoClose: true,
      right: [
        {
          onPress: () =>
            Alert.alert(
              "Alert",
              "Are you sure you want to delete?",
              [
                { text: "No", onPress: () => {}, style: "cancel" },
                { text: "Yes", onPress: () => deleteRegister() }
              ],
              { cancelable: true }
            ),
          text: "Delete",
          type: "delete"
        }
      ]
    };
    return (
      <Swipeout {...swipeProps}>
        <ButtonStyled onPress={this._onPress}>
          <Text>{title}</Text>
        </ButtonStyled>
      </Swipeout>
    );
  }
}

export default ListItem;
