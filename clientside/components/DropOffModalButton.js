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

const DropOffModalButton = () => {
	const [isModalVisible, setModalVisible] = useState(false);
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	function DropOffModal() {
		return (
			<View>
				<Modal
					isVisible={isModalVisible}
					onSwipeComplete={() => setModalVisible(false)}
					// onBackdropPress={() => setModalVisible(false)}
					swipeDirection="down"
					animationIn="slideInUp"
					animationOut="slideOutDown"
					swipeThreshold={300}
					style={{
						margin: 0,
					}}
				>
					<View style={styles.modal}>
						<Icon type="ionicon" name="remove-outline" size={25} />
						<Text style={styles.modalHeader}>Drop off</Text>
						<SessionOptions />
					</View>
				</Modal>
			</View>
		);
	}

	return (
		<TouchableOpacity style={styles.button} onPress={toggleModal}>
			<Text style={{ fontSize: FONT_SIZE.heading2, color: "white" }}>
				Where to?
			</Text>
			<DropOffModal />
		</TouchableOpacity>
	);
};

export default DropOffModalButton;

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
