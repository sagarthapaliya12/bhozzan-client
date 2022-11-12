import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";
import RestaurantProfile from "../screens/Restaurant/RestaurantProfile";
import EditProfile from "../screens/Restaurant/EditProfile";
import Menu from "../screens/Restaurant/Menu";
import AddMenu from "../screens/Restaurant/AddMenu";
import EditMenu from "../screens/Restaurant/EditMenu";
import Dashboard from "../screens/Restaurant/Dashboard";
import OrderStatus from "../screens/Restaurant/OrderStatus";
import AddSeats from "../screens/Restaurant/AddSeats";
import ConfirmTable from "../screens/Restaurant/ConfirmTable";

const Stack = createStackNavigator();

const DashboardNavigator = () => (
  <Stack.Navigator
    presentation="modal"
    screenOptions={{
      headerShown: false,
      animationDuration: 800,
    }}
  >
    <Stack.Screen name="Feed" component={Dashboard} />
    <Stack.Screen
      name="OrderStatus"
      component={OrderStatus}
      options={{
        title: "Orderrrr rrrr",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
  </Stack.Navigator>
);

const MenuNavigator = () => (
  <Stack.Navigator  >
    <Stack.Screen name="Feed" component={Menu} options={{ headerShown: false }} />
    <Stack.Screen
      name="AddMenu"
      component={AddMenu}
      options={{
        title: "Edit Profile",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
    <Stack.Screen name="EditMenu" component={EditMenu} />
  </Stack.Navigator>
);

const TablesNavigator = () => (
  <Stack.Navigator  >
    <Stack.Screen name="Feed" component={AddSeats} options={{ headerShown: false }} />
    <Stack.Screen
      name="ConfirmTable"
      component={ConfirmTable}
      options={{
        title: "Confirm Table",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
  </Stack.Navigator>
);

const ProfileNavigator = () => (
  <Stack.Navigator >
    <Stack.Screen name="Feed" component={RestaurantProfile} options={{ headerShown: false }} />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        title: "Edit Profile",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
  </Stack.Navigator>
);

export { DashboardNavigator, MenuNavigator, TablesNavigator, ProfileNavigator };
