import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import RestaurantProfile from "../screens/Customer/RestaurantProfile";
import BrowseCategory from "../screens/Customer/BrowseCategory";
import EditProfile from "../screens/Customer/EditProfile";
import OrderHistory from '../screens/Customer/OrderHistory';
import More from "../screens/Customer/More";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    presentation="modal"
    screenOptions={{
      headerShown: false,    
      animationDuration: 800,
    }}
  >
    <Stack.Screen name="Feed" component={HomeScreen} />
    <Stack.Screen name="BrowseCategory" component={BrowseCategory}  options={{title:"Categories"}} />
    <Stack.Screen name="RestaurantProfile" component={RestaurantProfile}  options={{title:"Restaurant Profile"}} />
  </Stack.Navigator>
);

const MoreNavigator = () => (
  <Stack.Navigator
    presentation="modal"
    screenOptions={{
      headerShown: false,
      animationDuration: 800,
    }}
  >
    <Stack.Screen name="Feed" component={More} />
    <Stack.Screen name="EditProfile" component={EditProfile} options={{title:"Edit Profile"}}/>
    <Stack.Screen name="OrderHistory" component={OrderHistory} options={{title: "Order History"}}/>
  </Stack.Navigator>
);

export { HomeNavigator, MoreNavigator};
