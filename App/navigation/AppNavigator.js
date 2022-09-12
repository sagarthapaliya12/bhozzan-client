import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import More from '../screens/Customer/More';
import Notifications from '../screens/Customer/Notifications';
import Chat from './../screens/Chat';
import Basket from './../screens/Customer/Basket';
import FeedNavigator from './FeedNavigator';
import colors from './../config/colors';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.screen,
        height: 80,
      },
      tabBarStyle: {
        backgroundColor: '#1D2227',
      },
      headerTintColor: colors.white,
      headerTitleAlign: 'center',
      animationDuration: 800,
    }}
  >
    <Tab.Screen
      name="Home"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Notifications"
      component={Notifications}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Basket"
      component={Basket}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="basket" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Chat"
      component={Chat}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="chat" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="More"
      component={More}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
