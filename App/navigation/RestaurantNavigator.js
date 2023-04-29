import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../config/colors";
import RestaurantProfile from "../screens/Restaurant/RestaurantProfile";
import EditProfile from "../screens/Restaurant/EditProfile";
import Menu from "../screens/Restaurant/Menu";
import AddMenu from "../screens/Restaurant/AddMenu";
import EditMenu from "../screens/Restaurant/EditMenu";
import Dashboard from "../screens/Restaurant/Dashboard";
import OrderStatus from "../screens/Restaurant/OrderStatus";
import TableList from "../screens/Restaurant/TableList";
import AddSeats from "../screens/Restaurant/AddSeats";
import ConfirmTable from "../screens/Restaurant/ConfirmTable";
import ReservationDetail from "../screens/Restaurant/ReservationDetail";
import QrScanner from "../components/Customer/HomeScreen/QrScanner";
import { useSelector } from "react-redux";
import OrderStatusEnum from "../enums/orderStatusEnum";

const Stack = createStackNavigator();

const DashboardNavigator = () => {
  const status = useSelector((state) => state.orderSlice.orderStatusState);
  return (
    <Stack.Navigator
      // presentation="modal"
      screenOptions={{
        // headerShown: false,
        headerTitleAlign: "center",
        animationDuration: 800,
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen
        name="OrderStatus"
        component={OrderStatus}
        options={{
          title: OrderStatusEnum[status],
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.screen,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const MenuNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
    <Stack.Screen
      name="AddMenu"
      component={AddMenu}
      options={{
        title: "Add Dish",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
    <Stack.Screen
      name="EditMenu"
      component={EditMenu}
      options={{
        title: "Edit Food Menu",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
  </Stack.Navigator>
);

const TablesNavigator = () => (
  <Stack.Navigator>
    {/* <Stack.Screen name="Feed" component={AddSeats} options={{ headerShown: false }} />
    <Stack.Screen
      name="ConfirmTable"
      component={ConfirmTable}
      options={{
        title: "Confirm Table",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    /> */}
    <Stack.Screen name="TableList" component={TableList} options={{ headerShown: false }} />
    <Stack.Screen
      name="ReservationDetail"
      component={ReservationDetail}
      options={{
        title: "Table Reservation",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
    <Stack.Screen
      name="AddSeats"
      component={AddSeats}
      options={{
        title: "Add Seats",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
    <Stack.Screen
      name="ConfirmTable"
      component={ConfirmTable}
      options={{
        title: "Confirm Table",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.screen,
        },
      }}
    />
  </Stack.Navigator>
);

const ProfileNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Feed" component={RestaurantProfile} options={{ headerShown: false }} />
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
    <Stack.Screen name="QrScanner" component={QrScanner} options={{ title: "Scan QR" }} />
  </Stack.Navigator>
);

export { DashboardNavigator, MenuNavigator, TablesNavigator, ProfileNavigator };
