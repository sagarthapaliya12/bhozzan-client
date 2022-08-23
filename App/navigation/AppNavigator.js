import React from 'react';

// import HomeScreen from '../screens/Home';
import More from '../screens/More';
import Notifications from '../screens/Notifications';
import Chat from './../screens/Chat';
import Basket from './../screens/Basket';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (

    <Tab.Navigator>
        {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
        <Tab.Screen name="More" component={More} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Basket" component={Basket} />
        <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
);

export default AppNavigator;
