import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../screens/HomeScreen';
import RestaurantProfile from '../screens/RestaurantProfile';

const Stack = createStackNavigator();

const FeedNavigator = ()=> (
    <Stack.Navigator presentation="modal" screenOptions={{headerShown: false}} >
        <Stack.Screen name="Feed" component={HomeScreen}/>
        <Stack.Screen name="Profile" component={RestaurantProfile}/>
    </Stack.Navigator>

    );

export default FeedNavigator; 