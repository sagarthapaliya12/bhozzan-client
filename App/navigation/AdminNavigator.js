import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Admin/HomeScreen";
import RestaurantProfile from "../screens/Restaurant/RestaurantProfile";

const Stack = createStackNavigator();

const AdminNavigator = () => (
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

const HomeScreenNavigator = () => (
  <Stack.Navigator
    presentation="modal"
    screenOptions={{
      headerShown: false,
      animationDuration: 800,
    }}
  >
    <Stack.Screen name="Feed" component={HomeScreen} />
    <Stack.Screen
      name="RestaurantProfile"
      component={RestaurantProfile}
      options={{ title: "Restaurant Profile" }}
    />
  </Stack.Navigator>
);
export { AdminNavigator, HomeScreenNavigator };
