import { createDrawerNavigator } from "react-navigation";

import ListCar from "./pages/listCar";
import CreateCar from "./pages/createCar";
import ViewCar from "./pages/viewCar";
import CreateOilChange from "./pages/createOilChange";

export const CarRoutes = {
  ListCar: {
    screen: ListCar,
    navigationOptions: {
      title: "List Car"
    }
  },
  CreateCar: {
    screen: CreateCar,
    navigationOptions: {
      title: "Create Car"
    }
  },
  ViewCar: {
    screen: ViewCar,
    navigationOptions: {
      title: "Car Details",
      drawerLabel: () => null
    }
  },
  CreateOilChange: {
    screen: CreateOilChange,
    navigationOptions: {
      title: "Oil Change",
      drawerLabel: () => null
    }
  }
};

export const createRootNavigator = () =>
  createDrawerNavigator(
    {
      ...CarRoutes
    },
    {
      initialRouteName: "ListCar"
    }
  );
