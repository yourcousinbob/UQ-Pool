import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

/* Screens */
import HomeScreen from "../screens/HomeScreen";
import SampleScreen from "../screens/SampleScreen";
import SessionOptions from "../components/SessionOptions";

export default function DrawerNavigator() {
	const Drawer = createDrawerNavigator();
	return (
		<Drawer.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: true,
			}}
		>
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen name="SampleScreen" component={SampleScreen} />
		</Drawer.Navigator>
	);
}
