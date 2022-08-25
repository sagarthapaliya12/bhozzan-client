import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./App/navigation/navigationTheme";

import AuthNavigator from "./App/navigation/AuthNavigator";
import AppNavigator from "./App/navigation/AppNavigator";


import LoginScreen from "./App/screens/LoginScreen";
import RegisterScreen from "./App/screens/RegisterScreen";
import RestaurantProfile from "./App/screens/RestaurantProfile";

export default function App() {
	return (
		<NavigationContainer theme={navigationTheme}>
			<AppNavigator />
		</NavigationContainer>
		// <RestaurantProfile/>
	);
}