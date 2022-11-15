import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Admin/HomeScreen";
import RestaurantProfile from "../screens/Restaurant/RestaurantProfile";
import AdminProfile from "../screens/Admin/AdminProfile";
import QrScanner from '../components/Customer/HomeScreen/QrScanner';

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

const AdminProfileNavigator = () => (
  <Stack.Navigator
    presentation="modal"
    screenOptions={{
      headerShown: false,
      animationDuration: 800,
    }}
  >
    <Stack.Screen name="AdminProfile" component={AdminProfile} />
    <Stack.Screen name="QrScanner" component={QrScanner} options={{ title: "Scan QR" }} />
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
export { AdminNavigator, AdminProfileNavigator, HomeScreenNavigator };
