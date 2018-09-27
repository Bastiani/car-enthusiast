import * as React from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components/native";

import FlatListCustom from "../components/common/FlatListCustom";
import { withStorage } from "../components/AsyncStorage/StorageHoc";
import CommonPage from "./commonPage";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 5px;
`;

const FlatListStyled = styled(FlatListCustom)`
  height: 300px;
`;

class ListCar extends React.PureComponent {
  state = { refreshing: false };

  componentDidMount() {
    const { navigation } = this.props;
    this._subscribe = navigation.addListener("didFocus", () => {
      this.onRefresh();
    });
  }

  handleCarView = id => {
    const { navigation } = this.props;

    navigation.navigate("ViewCar", { id });
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
      <CommonPage navigation={navigation}>
        <ScrollView>
          <Container>
            {storageResult &&
              storageResult.length >= 1 && (
                <FlatListStyled
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
      </CommonPage>
    );
  }
}

export default withStorage(ListCar, "@Car:details");
