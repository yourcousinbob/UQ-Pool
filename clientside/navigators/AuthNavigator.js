import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { selectAuthentication } from "../slices/userSlice";
import HomeScreenNavigator from "./HomeScreenNavigator";

/* Screens */
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

export default function AuthNavigator() {
	const Stack = createNativeStackNavigator();
	const authentication_token = useSelector(selectAuthentication);
	return (
		<Stack.Navigator>
			{authentication_token == null ? (
				<>
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
				</>
			)}
		</Stack.Navigator>
	);

}
