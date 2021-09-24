import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";


/* Screens */
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeScreen from '../screens/HomeScreen';
import RiderScreen from '../screens/RiderScreen';
import SampleScreen from '../screens/SampleScreen';
import { selectAuthentication } from '../slices/userSlice';

export default function AuthNavigator() {
    const Stack = createNativeStackNavigator(); 
    const authentication_token = useSelector(selectAuthentication);
    return (
        <Stack.Navigator>
            {/* how tf do I call useSelector() */}
                {authentication_token == null? (
                <>
                    <Stack.Screen 
                    name='LoginScreen'
                    component={LoginScreen}
                    options={{headerShown:false}}
                    />
                    <Stack.Screen 
                    name='RegistrationScreen'
                    component={RegistrationScreen}
                    options={{headerShown:false}}
                    />
                </>
                ) : (
                <>
                    <Stack.Screen 
                    name='HomeScreen'
                    component={HomeScreen}
                    options={{headerShown:false}}
                    />
                    <Stack.Screen 
                    name='RiderScreen'
                    component={RiderScreen}
                    options={{headerShown:false}}
                    />
                    <Stack.Screen 
                    name='SampleScreen'
                    component={SampleScreen}
                    options={{headerShown:false}}
                    />
                </>
                )}
                </Stack.Navigator>
    )
}
