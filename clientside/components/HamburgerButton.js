import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";

//required to move to another page
import { useNavigation } from "@react-navigation/native"; 

/**
 * This is a hamburger style button which takes you to other pages.
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
				{/*minimalistic burger icon */}
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

//allows us to import to other pages
export default HamburgerButton;

//stylesheet
const styles = StyleSheet.create({
	button: {
		//needed for ios users
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
		//needed for android users
		elevation: 7,
	},
});
