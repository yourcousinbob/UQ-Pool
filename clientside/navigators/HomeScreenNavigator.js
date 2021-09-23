import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

/* Screens */
import HomeScreen from '../screens/HomeScreen';
import SupportScreen from '../screens/SupportScreen';

export default function HomeScreenNavigator() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Ride History" component={HomeScreen} />
            <Drawer.Screen name="Reward" component={HomeScreen} />
            <Drawer.Screen name="Support" component={SupportScreen} />
        </Drawer.Navigator>
    );
}