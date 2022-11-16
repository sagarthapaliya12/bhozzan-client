import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";
import HomeScreen from "../screens/HomeScreen";
import RestaurantProfile from "../screens/Customer/RestaurantProfile";
import BrowseCategory from "../screens/Customer/BrowseCategory";
import EditProfile from "../screens/Customer/EditProfile";
import OrderHistory from "../screens/Customer/OrderHistory";
import More from "../screens/Customer/More";
import FavoritesScreen from "../screens/Customer/FavoritesScreen";
import BasketList from "../screens/Customer/BasketList";
import BasketDetail from "../screens/Customer/BasketDetail";
import QrGenerator from "../components/Customer/HomeScreen/QrGenerator";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  const categoryState = useSelector((state) => state.restaurantSlice.categoryState);

  return (
    <Stack.Navigator
    // presentation="modal"
    // screenOptions={{
    //   headerShown: false,
    //   animationDuration: 800,
    // }}
    >
      <Stack.Screen name="Feed" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="BrowseCategory"
        component={BrowseCategory}
        options={{
          // title: categoryState,
          title: categoryState?.charAt(0).toUpperCase() + categoryState?.slice(1),
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.screen,
          },
        }}
      />
      <Stack.Screen
        name="RestaurantProfile"
        component={RestaurantProfile}
        options={{
          title: "Restaurant Profile",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.screen,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const BasketNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Basket Details" component={BasketList} options={{ headerShown: false }}/>
    <Stack.Screen
      name="BasketDetail"
      component={BasketDetail}
      options={{
        title: "Basket Details",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />

    <Stack.Screen
      name="QrGenerator"
      component={QrGenerator}
      options={{
        // title: "Basket",
        // headerTintColor: colors.white,
        // headerStyle: {
        //   backgroundColor: colors.screen,
        // },
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const MoreNavigator = () => (
  <Stack.Navigator
  // presentation="modal"
  // screenOptions={{
  //   headerShown: false,
  //   animationDuration: 800,
  // }}
  >
    <Stack.Screen name="Feed" component={More} options={{ headerShown: false }} />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        title: "Edit Profile",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
    <Stack.Screen
      name="OrderHistory"
      component={OrderHistory}
      options={{
        title: "Order History",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
    <Stack.Screen
      name="FavoritesScreen"
      component={FavoritesScreen}
      options={{
        title: "Favorites List",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
  </Stack.Navigator>
);
// };

export { HomeNavigator, BasketNavigator, MoreNavigator };
