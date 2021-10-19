import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

/* Alerts */
import { LogoutAlert } from '../components/alerts/LogoutAlert';

/* Screens */
import HomeScreen from '../screens/HomeScreen';
import SupportScreen from '../screens/SupportScreen';
import RewardScreen from '../screens/RewardScreen';
import RideHistoryScreen from '../screens/RideHistoryScreen';
import ChatScreen from '../screens/ChatScreen';
import BecomeDriverScreen from '../screens/BecomeDriverScreen';
import ProfilePage from '../screens/ProfilePage';
import RideDetails from '../screens/RideDetails';

import { useDispatch, useSelector } from 'react-redux';
import { selectSID } from '../slices/userSlice';

function CustomDrawerContent(props) {
    const dispatch = useDispatch();
    const sid = useSelector(selectSID);
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => LogoutAlert(dispatch, sid)} />
        </DrawerContentScrollView>
    );
}

export default function HomeScreenNavigator() {
    const Drawer = createDrawerNavigator();
    return (
        
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />} >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Ride History" component={RideHistoryScreen} />
            <Drawer.Screen name="Reward" component={RewardScreen} />
            <Drawer.Screen name="Support" component={SupportScreen} />
            <Drawer.Screen name="Chat" component={ChatScreen} />
            <Drawer.Screen name="Become A Driver" component={BecomeDriverScreen} />
            <Drawer.Screen name="Profile" component={ProfilePage} />
            <Drawer.Screen name="Ride Details" component={RideDetails} />
        </Drawer.Navigator>
    );
}
