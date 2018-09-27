import * as React from "react";
import { DrawerNavigator } from "react-navigation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Menu from "./components/common/menu";
import ListCar from "./pages/listCar";
import CreateCar from "./pages/createCar";
import ViewCar from "./pages/viewCar";

export const CarRoutes = {
  ListCar: {
    screen: ListCar,
    navigationOptions: {
      title: "List Car",
      drawerIcon: () => <FontAwesome5 name="list" solid />
    }
  },
  CreateCar: {
    screen: CreateCar,
    navigationOptions: {
      title: "Create Car",
      drawerIcon: () => <FontAwesome5 name="car" solid />
    }
  },
  ViewCar: {
    screen: ViewCar,
    navigationOptions: {
      title: "Car Details",
      drawerLabel: () => null
    }
  }
};

export const Routes = DrawerNavigator(
  {
    ...CarRoutes
  },
  {
    initialRouteName: "ListCar",
    contentComponent: Menu,
    drawerPosition: "left",
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);
