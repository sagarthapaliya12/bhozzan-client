import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./navigationTheme";
import CustomerTab from "../components/Customer/CustomerTab";
import RestaurantTab from "../components/Restaurant/RestaurantTab";
import PublicNavigator from "../navigation/PublicNavigator";
import { useSelector } from "react-redux";
import AdminTab from "../components/Admin/AdminTab";

const AppRoutes = () => {
  const auth = useSelector((state) => state.authSlice);

  return (
    <NavigationContainer theme={navigationTheme}>
      {!auth.user && <PublicNavigator />}
      {/* {!auth.user && <RestaurantTab />} */}
      {auth.user?.role === "customer" && <CustomerTab />}
      {auth.user?.role === "manager" && <RestaurantTab />}
      {auth.user?.role === "admin" && <AdminTab />}
      {auth.user?.role === "shipper" && <AdminTab />}
    </NavigationContainer>
  );
};

export default AppRoutes;
