import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { selectAuthentication } from "../slices/userSlice";
import HomeScreenNavigator from "./HomeScreenNavigator";

/* Screens */
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import ChatScreen from "../screens/ChatScreen";
import RateTripScreen from '../screens/RateTripScreen';


/**
 * Authentifaction screen/s navigation options
 */
export default function AuthNavigator() {
	const Stack = createNativeStackNavigator();
	const authentication_token = useSelector(selectAuthentication);
	return (
		<Stack.Navigator>
			{authentication_token == null ? (
				<>
					{/*Display Login screen first */}
					<Stack.Screen
						name="LoginScreen"
						component={LoginScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="RegistrationScreen"
						component={RegistrationScreen}
						options={{ headerShown: false }}
					/>
				</>
			) : (
				<>
					<Stack.Screen
						name="Root"
						component={HomeScreenNavigator}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Chat"
						component={ChatScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Rate"
						component={RateTripScreen}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);

}
