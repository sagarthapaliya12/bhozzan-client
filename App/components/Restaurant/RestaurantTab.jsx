import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import Chat from "../../screens/Chat";
import {
  DashboardNavigator,
  MenuNavigator,
  TablesNavigator,
  ProfileNavigator,
} from "../../navigation/RestaurantNavigator";

const Tab = createBottomTabNavigator();

const RestaurantTab = () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.screen,
      },
      tabBarStyle: {
        backgroundColor: "#1D2227",
      },
      tabBarHideOnKeyboard: true,
      headerTintColor: colors.white,
      headerTitleAlign: "center",
      headerStatusBarHeight: 10,
      animationDuration: 800,
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Menus"
      component={MenuNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="menu-book" size={size} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="Tables"
      component={TablesNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="table-furniture" size={size} color={color} />
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
      name="Profile"
      component={ProfileNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default RestaurantTab;
