// @flow
import * as React from "react";
import { ScrollView, Button, RefreshControl } from "react-native";
import styled from "styled-components/native";

import FlatListCustom from "../components/common/FlatListCustom";
import { withStorage } from "../components/AsyncStorage/StorageHoc";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 5px;
`;

class ListCar extends React.PureComponent {
  state = { refreshing: false };

  handleCarView = async id => {
    const { navigation } = this.props;
    navigation.navigate("ViewCar", { date: id });
  };

  onRefresh = async () => {
    const { refreshStorage } = this.props;
    this.setState({ refreshing: true });
    await refreshStorage();
    this.setState({ refreshing: false });
  };

  render() {
    const { navigation, storageResult, deleteRegister } = this.props;
    const { refreshing } = this.state;

    return (
      <ScrollView>
        <Container>
          <Button
            title="Create Car"
            onPress={() => navigation.navigate("CreateCar")}
          />
          {storageResult.length >= 1 && (
            <FlatListCustom
              data={storageResult}
              onItemClick={id => this.handleCarView(id)}
              deleteRegister={deleteRegister}
              refreshControl={(
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.onRefresh}
                />
)}
            />
          )}
        </Container>
      </ScrollView>
    );
  }
}

export default withStorage(ListCar, "@Car:details");
