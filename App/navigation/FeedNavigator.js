import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import RestaurantProfile from '../screens/Customer/RestaurantProfile';
import BrowseCategory from '../screens/Customer/BrowseCategory';

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator
    presentation="modal"
    screenOptions={{
      headerShown: false,
      animationDuration: 800,
    }}
  >
    <Stack.Screen name="Feed" component={HomeScreen} />
    <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} />
    <Stack.Screen name="BrowseCategory" component={BrowseCategory} />
  </Stack.Navigator>
);

export default FeedNavigator;
