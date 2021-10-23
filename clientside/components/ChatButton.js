import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { BOX, COLORS, FONT_SIZE } from "../stylesheets/theme";
import { Icon } from "react-native-elements";
import SessionOptions from "./SessionOptions";
import { useNavigation } from "@react-navigation/core";

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
