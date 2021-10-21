import React from "react";
import { StyleSheet, TouchableOpacity, Button, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native"; //required to move to another page
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { box } from "../stylesheets/theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

/**
 * This is a sample button which takes you to another page.
 *
 * To render this component on a page, you must add
 *  ' <HamburgerButton/> ' to the page and ensure it has been imported like below
 *  'import HamburgerButton from '../components/Samples/HamburgerButton';'
 */

const HamburgerButton = () => {
	const navigation = useNavigation(); //required when moving to another page

	return (
		<SafeAreaView>
			<Pressable
				onPress={() => navigation.openDrawer()} // change this to whatever screen you want and add screen to App.js
			>
				<Icon
					type='ionicon'
					name='menu-outline'
					size={25}
					color='black'
					style={styles.button}
				/>
			</Pressable>
		</SafeAreaView>
	);
};

export default HamburgerButton;

const styles = StyleSheet.create({
	button: {
		zIndex: 9999,
		width: 40,
		height: 40,
		borderRadius: 50 / 2,
		margin: 20,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		shadowOffset: { height: 3 },
		shadowOpacity: 0.6,
		shadowRadius: 8,
		shadowColor: "gray",
		elevation: 7,
	},
});
