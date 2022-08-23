import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "./../screens/RegisterScreen";
import LoginScreen from "./../screens/LoginScreen";
import Notifications from "../screens/Notifications";
// import Home from "../screens/Home";

const Stack = createStackNavigator();

const AuthNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
        name="LoginScreen" 
        component={LoginScreen}
        options={{ headerShown: false }} />
		<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
		<Stack.Screen name="Notifications" component={Notifications} />
	</Stack.Navigator>
);

export default AuthNavigator;
