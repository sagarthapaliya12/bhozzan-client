import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RestaurantProfile from "../screens/Restaurant/RestaurantProfile";
import EditProfile from "../screens/Restaurant/EditProfile";
import Menu from "../screens/Restaurant/Menu";
import AddMenu from "../screens/Restaurant/AddMenu";
import EditMenu from "../screens/Restaurant/EditMenu";

const Stack = createStackNavigator();

const DashboardNavigator = () => (
  <Stack.Navigator
    presentation="modal"
    screenOptions={{
      headerShown: false,
      animationDuration: 800,
    }}
  >
    <Stack.Screen name="Feed" component={HomeScreen} />
  </Stack.Navigator>
);

const MenuNavigator = () => (
  <Stack.Navigator
    presentation="modal"
    screenOptions={{
      headerShown: false,
      animationDuration: 800,
    }}
  >
    <Stack.Screen name="Feed" component={Menu} />
    <Stack.Screen name="AddMenu" component={AddMenu} />
    <Stack.Screen name="EditMenu" component={EditMenu} />
  </Stack.Navigator>
);

const ProfileNavigator = () => (
  <Stack.Navigator
    presentation="modal"
    screenOptions={{
      headerShown: false,
      animationDuration: 800,
    }}
  >
    <Stack.Screen name="Feed" component={RestaurantProfile} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
  </Stack.Navigator>
);

export { DashboardNavigator, ProfileNavigator, MenuNavigator };
