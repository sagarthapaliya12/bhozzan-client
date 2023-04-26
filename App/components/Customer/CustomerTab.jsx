import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import Notifications from "../../screens/Customer/Notifications";
import {
  HomeNavigator,
  BasketNavigator,
  MoreNavigator,
  // MapNavigator,
} from "../../navigation/CustomerNavigator";
import { View } from "react-native";
import { Badge } from "react-native-paper";
import Chat from "../../screens/Chat";
import { useDispatch, useSelector } from "react-redux";
import { getBasketCount } from "../../screens/Customer/customerSlice";

const Tab = createBottomTabNavigator();

const CustomerTab = () => {
  const dispatch = useDispatch();
  const basketCount = useSelector((state) => state.customerSlice.basketCount);
  const newNotificationsCount = useSelector(
    (state) => state.notificationSlice.notifications.unviewed.length
  );

  useEffect(() => {
    dispatch(getBasketCount());
  }, [basketCount]);

  return (
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

      {/* <Tab.Screen
        name="Map"
        component={MapNavigator}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <MaterialCommunityIcons name="bell" color={color} size={size} />
              {newNotificationsCount ? (
                <Badge style={{ position: "absolute", right: 0 }} size={size - 6}>
                  <Text> {newNotificationsCount}</Text>
                </Badge>
              ) : null}
            </View>
          ),
        }}
      />

      <Tab.Screen
        // style={{ backgroundColor: "red" }}
        name="Basket"
        component={BasketNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View>
              <MaterialCommunityIcons name="basket" color={color} size={size} />
              <Badge style={{ position: "absolute", right: 0 }} size={size - 6}>
                {basketCount}
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
};

export default CustomerTab;
