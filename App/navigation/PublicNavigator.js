import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "../screens/Public/RegisterScreen";
import LoginScreen from "../screens/Public/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RestaurantSignup from '../screens/Restaurant/RestaurantSignup';
import Dashboard from "../screens/Restaurant/Dashboard";

const Stack = createStackNavigator();

const PublicNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="RestaurantSignup" component={RestaurantSignup} />
    <Stack.Screen name="Dashboard" component={Dashboard} />
  </Stack.Navigator>
);

export default PublicNavigator;
