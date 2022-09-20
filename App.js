import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./App/navigation/navigationTheme";

import AuthNavigator from "./App/navigation/AuthNavigator";
import CustomerTab from './App/components/Customer/CustomerTab';
 

export default function App() {
	return (
		<NavigationContainer theme={navigationTheme}>
			<CustomerTab />
			{/* <AuthNavigator /> */}
		</NavigationContainer>
		// <RestaurantProfile/>
	);
}