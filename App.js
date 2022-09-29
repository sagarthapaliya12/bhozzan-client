import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./App/navigation/navigationTheme";

import CustomerTab from "./App/components/Customer/CustomerTab";
import RestaurantTab from "./App/components/Restaurant/RestaurantTab";
import PublicNavigator from "./App/navigation/PublicNavigator";

const auth = {
  user: { id: "6019e133h3e3sj72837283", name: "Jack Blah Blah Blah", role: "customer" },
};

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      {!auth.user && <PublicNavigator />}
      {auth.user?.role === "customer" && <CustomerTab />}
      {auth.user?.role === "restaurant" && <RestaurantTab />}
    </NavigationContainer>
  );
}
