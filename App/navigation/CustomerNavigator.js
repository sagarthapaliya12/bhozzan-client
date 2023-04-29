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
import TableList from "../screens/Customer/TableList";
import ReserveTable from "../screens/Customer/ReserveTable";
import OrderHistoryDetail from "../screens/Customer/OrderHistoryDetail";
import MyReservation from "../screens/Customer/MyReservation";
import ExploreScreen from "../screens/Customer/ExploreScreen";
import ChangePassword from "../screens/Customer/ChangePassword";
import ChooseLocation from "../screens/Customer/ChooseLocation";
import Checkout from "../screens/Customer/Checkout";
import Chat from "../screens/Chat";
import Messages from "../screens/Customer/Messages";

import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  const categoryState = useSelector((state) => state.restaurantSlice.categoryState);

  return (
    <Stack.Navigator
    // presentation="modal"
    screenOptions={{      
      animationDuration: 300,
    }}
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
      <Stack.Screen
        name="RestaurantTables"
        component={TableList}
        options={{
          title: "Tables",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.screen,
          },
        }}
      />
      <Stack.Screen
        name="ReserveTable"
        component={ReserveTable}
        options={{
          title: "Reserve Table",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.screen,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const MapNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Nearby" component={ExploreScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="ExploreScreen"
      component={ExploreScreen}
      options={{
        title: "Nearby",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
  </Stack.Navigator>
);

const BasketNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="BasketList" component={BasketList} options={{ headerShown: false }} />
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
      name="ChooseLocation"
      component={ChooseLocation}
      options={{
        title: "Delivery Location",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />

    <Stack.Screen
      name="Checkout"
      component={Checkout}
      options={{
        title: "Checkout",
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
  </Stack.Navigator>
);

const ChatNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: "center",
      animationDuration: 800,
    }}
  >
    <Stack.Screen
      name="Chat Screen"
      component={Chat}
      options={{
        title: "Chat",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />

    <Stack.Screen
      name="Messages Screen"
      component={Messages}
      options={({ route }) => ({
        title: route.params.userName,
        headerTintColor: colors.white,
        tabBarStyle: {display: "none"},
        headerStyle: {
          backgroundColor: colors.screen,
        },
      })}
    />
  </Stack.Navigator>
);

const MoreNavigator = () => (
  <Stack.Navigator
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
      name="OrderHistoryDetail"
      component={OrderHistoryDetail}
      options={{
        title: "Order Detail",
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
    <Stack.Screen
      name="MyReservation"
      component={MyReservation}
      options={{
        title: "My Reservations",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{
        title: "Change Password",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
  </Stack.Navigator>
);
// };

export { HomeNavigator, MapNavigator, BasketNavigator, ChatNavigator, MoreNavigator };
