import * as React from 'react';
import { AsyncStorage, Text } from 'react-native';

function withStorage(WrappedComponent) {
  return class extends React.Component {
    state = { listCars: null };

    async componentDidMount() {
      this.getCars();
    }

    getCars = async () => {
      const list = await AsyncStorage.getItem('@Car:details');
      this.setState({ listCars: JSON.parse(list) });
    };

    render() {
      const { listCars } = this.state;
      if (listCars === null) {
        return <Text>Loading...</Text>;
      }
      return <WrappedComponent listCars={listCars} {...this.props} />;
    }
  };
}

export default withStorage;
