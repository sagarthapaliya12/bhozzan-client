import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RestaurantProfile from "../screens/Restaurant/RestaurantProfile";
import EditProfile from "../screens/Restaurant/EditProfile";
// import More from "../screens/Customer/More";

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
    <Stack.Screen name="BrowseCategory" component={BrowseCategory} />
    <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} />
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

export { DashboardNavigator, ProfileNavigator };
