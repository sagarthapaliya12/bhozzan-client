import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import RestaurantProfile from "../screens/Customer/RestaurantProfile";
import BrowseCategory from "../screens/Customer/BrowseCategory";
import EditProfile from "../screens/Customer/EditProfile";
import More from "../screens/Customer/More";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    presentation="modal"
    screenOptions={{
      headerShown: false,
      animationDuration: 800,
    }}
  >
    <Stack.Screen name="Feed" component={HomeScreen} />
    <Stack.Screen name="BrowseCategory" component={BrowseCategory} />
    <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} />
  </Stack.Navigator>
);

const MoreNavigator = () => (
  <Stack.Navigator
    presentation="modal"
    screenOptions={{
      headerShown: false,
      animationDuration: 800,
    }}
  >
    <Stack.Screen name="Feed" component={More} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
  </Stack.Navigator>
);

export { HomeNavigator, MoreNavigator };
