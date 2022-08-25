import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './../screens/RegisterScreen';
import LoginScreen from './../screens/LoginScreen';
// import RestaurantProfile from '../screens/RestaurantProfile';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
    />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />

  </Stack.Navigator>
);

export default AuthNavigator;

