import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../../screens/HomeScreen";
import colors from "../../config/colors";
// import Basket from "../../screens/Customer/Basket";
import Notifications from "../../screens/Customer/Notifications";
import More from "../../screens/Customer/More";
import { HomeNavigator, BasketNavigator, MoreNavigator } from "../../navigation/CustomerNavigator";
import { View } from "react-native";
import { Badge } from "react-native-paper";
import Chat from "../../screens/Chat";

const Tab = createBottomTabNavigator();

const CustomerTab = () => (
  <Tab.Navigator
    screenOptions={{
      // headerShown: false,
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
      name="Home"
      component={HomeNavigator}
      options={{
        headerShown: false,
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
      // style={{ backgroundColor: "red" }}
      name="Basket"
      component={BasketNavigator}
      options={{
        // headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <View>
            <MaterialCommunityIcons
              // style={{ position: "absolute", left: 0 }}
              name="basket"
              color={color}
              size={size}
            />
            <Badge style={{ position: "absolute", right: 0 }} size={size - 6}>
              3
            </Badge>
          </View>
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
      component={MoreNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default CustomerTab;
