import React from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { BOX, COLORS, FONT_SIZE } from "../stylesheets/theme";
import { useNavigation } from "@react-navigation/core";

/**
 * Creates a button that opens a chat
 * between driver and riders for a specfic
 * route.
 */
const ChatButton = () => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Chat")}>
			<Text style={{ fontSize: FONT_SIZE.heading2, color: "white" }}>
				Open Chat
			</Text>
		</TouchableOpacity>
	);
};

//allows us to import to other pages
export default ChatButton;

const styles = StyleSheet.create({
	modal: {
		backgroundColor: "white",
		position: "absolute",
		bottom: 0,
		borderTopLeftRadius: BOX.borderRadius,
		borderTopRightRadius: BOX.borderRadius,
		width: "100%",
		minHeight: Dimensions.get("window").height * 0.75,
		padding: 15,
		paddingTop: 5,
	},
	button: {
		backgroundColor: COLORS.primary,
		borderRadius: BOX.borderRadius,
		padding: 15,
		marginBottom: 10,
	},
	modalHeader: {
		fontSize: FONT_SIZE.heading3,
		fontWeight: "bold",
		marginBottom: 10,
	},
});
