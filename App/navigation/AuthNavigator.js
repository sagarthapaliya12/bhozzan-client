import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './../screens/RegisterScreen';
import LoginScreen from './../screens/LoginScreen';
// import RestaurantProfile from '../screens/RestaurantProfile';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    {/* <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} /> */}
  </Stack.Navigator>
);

export default AuthNavigator;
