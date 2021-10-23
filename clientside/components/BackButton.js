import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { CommonActions } from "@react-navigation/native";

const BackButton = () => {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={styles.container}>
			<Pressable onPress={() => navigation.dispatch(CommonActions.goBack())}>
				<Icon
					type='ionicon'
					name='chevron-back-outline'
					size={20}
					color='black'
					style={styles.button}
				/>
			</Pressable>
		</SafeAreaView>
	);
};

export default BackButton;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 9999,
		
	},
	button: {
		width: 40,
		height: 40,
		borderRadius: 50 / 2,
		margin: 20,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		shadowOffset: { height: 3 },
		shadowOpacity: 0.4,
		shadowRadius: 8,
		shadowColor: "gray",
		elevation: 5,
	},
});
