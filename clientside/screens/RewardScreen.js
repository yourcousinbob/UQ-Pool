import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { fonts } from "react-native-elements/dist/config";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import { min } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { box, BOX, COLORS, FONT_SIZE } from "../stylesheets/theme";

const Redeem = () => {
    Alert.alert('Success', 'Please get the following barcode scanned to claim your reward!')
    /*Display a random qr/bar code image, with a button saying finished HERE*/
  }

const RewardScreen = () => {
	return (
		<View
			style={{ backgroundColor: COLORS.primary, width: "100%", height: "100%" }}
		>
			<View style={styles.header}>
				<SafeAreaView style={{width: Dimensions.get("window").width}}>
					<View
						style={{
							// backgroundColor: "red",
							justifyContent: "center",
							alignItems: "center",
                            height: "70%"
						}}
					>
						<Text style={{ fontSize: FONT_SIZE.title, color: COLORS.primary }}>
							Rewards
						</Text>
					</View>
					<View style={{height: "30%", display: "flex", alignItems: "flex-start"}}>
						<View style={[styles.pointsDisplay, box.shadows]}>
							<Text style={{ fontSize: FONT_SIZE.text, color: "white" }}>Points: 80</Text>
						</View>
					</View>
				</SafeAreaView>
			</View>
		</View>
	);
};

export default RewardScreen;

const styles = StyleSheet.create({
	header: {
		backgroundColor: "white",
		height: 260,
		justifyContent: "center",
		alignItems: "center",
		borderBottomEndRadius: BOX.borderRadius,
		borderBottomStartRadius: BOX.borderRadius,
	},
	pointsDisplay: {
		backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems:"center",
		borderRadius: BOX.borderRadius,
        padding: 15,
        marginLeft: 15
	},
});
