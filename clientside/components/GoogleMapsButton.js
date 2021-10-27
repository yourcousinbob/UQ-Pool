import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	Dimensions,
	Linking,
} from "react-native";
import { BOX, COLORS, FONT_SIZE } from "../stylesheets/theme";

/**
 * Opens google maps integration
 * automatically centred on UQ campus
 */
const GoogleMapsButton = () => {

	function openGoogleMaps() {
		const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
		const latLng = `${-27.512802},${153}`;
		const label = 'Custom Label';
		const url = Platform.select({
	  		ios: `${scheme}${label}@${latLng}`,
	  		android: `${scheme}${latLng}(${label})`
		});
		Linking.openURL(url)
	}

	return (
		<TouchableOpacity style={styles.button} onPress={() => openGoogleMaps()}>
			<Text style={{ fontSize: FONT_SIZE.heading2, color: "white" }}>
				Open Google Maps
			</Text>
		</TouchableOpacity>
	);
};

//allows us to import to other pages
export default GoogleMapsButton;

//stylesheet
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
