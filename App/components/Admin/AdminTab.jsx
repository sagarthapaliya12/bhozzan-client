import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import { ProfileNavigator, MenuNavigator } from "../../navigation/RestaurantNavigator";
import AdminProfile from '../../screens/Admin/AdminProfile';
import RestaurantApproval from '../../screens/Admin/RestaurantApproval';
import { AdminNavigator, AdminProfileNavigator, HomeScreenNavigator } from "../../navigation/AdminNavigator";

const Tab = createBottomTabNavigator();

const AdminTab = () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: {      
        backgroundColor: colors.screen,        
      },  
      tabBarStyle: {
        backgroundColor: "#1D2227",
      },
      headerTintColor: colors.white,
      headerTitleAlign: "center",
      headerStatusBarHeight: 10,
      animationDuration: 800,
    }}
  >
    <Tab.Screen
      name="Active Restaurants"
      component={HomeScreenNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="office-building" size={24} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="New Approvals"
      component={RestaurantApproval}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-clock" size={size} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="Admin Profile"
      component={AdminProfileNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AdminTab;
