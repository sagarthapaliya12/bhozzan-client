import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./navigationTheme";
import CustomerTab from "../components/Customer/CustomerTab";
import RestaurantTab from "../components/Restaurant/RestaurantTab";
import PublicNavigator from "../navigation/PublicNavigator";
import Dashboard from "../screens/Admin/Dashboard";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const auth = useSelector((state) => state.authSlice);

  return (
    <NavigationContainer theme={navigationTheme}>
      {!auth.user && <PublicNavigator />}
      {auth.user?.role === "customer" && <CustomerTab />}
      {auth.user?.role === "manager" && <RestaurantTab />}
      {auth.user?.role === "admin" && <Dashboard />}
      {auth.user?.role === "shipper" && <Dashboard />}
    </NavigationContainer>
  );
};

export default AppRoutes;
