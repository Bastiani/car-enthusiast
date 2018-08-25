// @flow
import * as React from 'react';
import { ScrollView, Button, AsyncStorage } from 'react-native';
import styled from 'styled-components/native';

import FlatListCustom from '../components/common/FlatListCustom';

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 5px;
`;

class ListCar extends React.PureComponent {
  state = { listCars: [] };

  async componentDidMount() {
    this.getCars();
  }

  getCars = async () => {
    const list = await AsyncStorage.getItem('@Car:details');
    this.setState({ listCars: JSON.parse(list) });
  };

  handleCarView = async (id) => {
    const { navigation } = this.props;
    navigation.navigate('ViewCar', { carId: id });
  };

  render() {
    const { navigation } = this.props;
    const { listCars } = this.state;

    return (
      <ScrollView>
        <Container>
          <Button title="Create Car" onPress={() => navigation.navigate('CreateCar')} />
          {listCars.length >= 1 && (
            <FlatListCustom data={listCars} onItemClick={id => this.handleCarView(id)} />
          )}
        </Container>
      </ScrollView>
    );
  }
}

export default ListCar;
