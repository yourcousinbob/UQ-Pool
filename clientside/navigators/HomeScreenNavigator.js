import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

/* Screens */
import HomeScreen from '../screens/HomeScreen';
import SupportScreen from '../screens/SupportScreen';
import RewardScreen from '../screens/RewardScreen';
import RideHistoryScreen from '../screens/RideHistoryScreen';


export default function HomeScreenNavigator() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Ride History" component={RideHistoryScreen} />
            <Drawer.Screen name="Reward" component={RewardScreen} />
            <Drawer.Screen name="Support" component={SupportScreen} />
        </Drawer.Navigator>
    );
}