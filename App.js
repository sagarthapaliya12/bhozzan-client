import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./App/navigation/navigationTheme";

// import AuthNavigator from "./App/navigation/AuthNavigator";
import CustomerTab from './App/components/Customer/CustomerTab';
import RestaurantTab from './App/components/Restaurant/RestaurantTab';
 

export default function App() {
	return (
		<NavigationContainer theme={navigationTheme}>
			{/* <RestaurantTab/> */}
			<CustomerTab />
			{/* <AuthNavigator /> */}
		</NavigationContainer>
		// <RestaurantProfile/>
	);
}