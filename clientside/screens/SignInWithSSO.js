import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { COLORS, BOX } from "../stylesheets/theme";
import SSOWebView from "../components/SSOWebView.js";

function SingInButton() {
        
	return (
		<TouchableOpacity
			onPress={() => console.log("go into sso")}
			style={styles.button}
		>
			<Text style={styles.buttonText}>Sign in with SSO</Text>
		</TouchableOpacity>
	);
}

const SignInWithSSO = () => {
	return (
		<View style={styles.view}>
			<View style={{ height: "55%", width: "100%", padding: 20 }}>
				<Image
					style={{
						resizeMode: "contain",
						height: "90%",
						width: "100%",
					}}
					source={require("../assets/loginPicture.png")}
				/>
			</View>
			<View
				style={{
					height: "45%",
					width: "100%",
					backgroundColor: "white",
					borderTopStartRadius: 20,
					borderTopEndRadius: 20,
					paddingVertical: 25,
				}}
			>
				<SingInButton />
			</View>
		</View>
	);
};

export default SignInWithSSO;

const styles = StyleSheet.create({
	view: {
		backgroundColor: COLORS.primary,
		height: "100%",
		width: "100%",
	},
	button: {
		backgroundColor: COLORS.primary,
		marginHorizontal: "25%",
		marginTop: 10,
		paddingVertical: 10,
		borderRadius: BOX.borderRadius,
	},

	buttonText: {
		color: "white",
		textAlign: "center",
		fontSize: 16,
	},
});
