import { createStackNavigator } from 'react-navigation';

import ListCar from './pages/listCar';
import CreateCar from './pages/createCar';
import ViewCar from './pages/viewCar';

export const CarRoutes = createStackNavigator({
  ListCar: {
    screen: ListCar,
    navigationOptions: {
      title: 'List Car',
    },
  },
  CreateCar: {
    screen: CreateCar,
    navigationOptions: {
      title: 'Create Car',
    },
  },
  ViewCar: {
    screen: ViewCar,
    navigationOptions: {
      title: 'Car Details',
    },
  },
});

export const createRootNavigator = () => createStackNavigator(
  {
    Car: { screen: CarRoutes },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'Car',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);
