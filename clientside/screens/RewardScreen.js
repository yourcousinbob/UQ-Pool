import React, { useEffect, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	TouchableOpacity,
	SectionList,
	Alert,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import { selectSID } from "../slices/userSlice";
import { box, BOX, COLORS, FONT_SIZE } from "../stylesheets/theme";

const Redeem = () => {
	Alert.alert(
		"Success",
		"Please get the following barcode scanned to claim your reward!"
	);
	/*Display a random qr/bar code image, with a button saying finished HERE*/
};

const RewardsHeader = () => {
	const points = useSelector(selectTokens)
	const sid = useSelector(selectSID)	

	return (
		<View style={styles.header}>
			<SafeAreaView style={{ width: Dimensions.get("window").width }}>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						height: "60%",
					}}
				>
					<Text style={{ fontSize: FONT_SIZE.title, color: COLORS.primary }}>
						Rewards
					</Text>
				</View>
				<View style={{ height: "40%", display: "flex", alignItems: "center" }}>
					<View style={[box.shadows, styles.pointsDisplay]}>
						<Text style={{ fontSize: FONT_SIZE.text, color: "white" }}>
							Points: {points}
						</Text>
					</View>
				</View>
			</SafeAreaView>
		</View>
	);
};

const RewardScreen = () => {
	const [rewards, setRewards] = useState(null);


	useEffect(() => {
		const getRewards = async () => {
			try {
				const response = await fetch("https://uqpool.xyz:7777/rewards", {
					method: "GET",
					headers: {
						accept: "application/json",
						"Content-Type": "application/json",
					},
				});
				const json = await response.json();
				setRewards(json.rewards);
			} catch (error) {
				console.log("Caught error when retreiving rewards");
				console.log(error);
			}
		};

		getRewards();
	}, []);

	return (
		<View style={{ backgroundColor: COLORS.primary, height: "100%" }}>
			<BackButton />
			<FlatList
				scrollIndicatorInsets={{ right: 1 }}
				ListHeaderComponent={<RewardsHeader />}
				columnWrapperStyle={{
					justifyContent: "space-between",
					marginHorizontal: 10,
				}}
				data={rewards}
				keyExtractor={(item) => {
					return item.reward_id;
				}}
				numColumns={2}
				renderItem={(post) => {
					const item = post.item;
					return (
						<TouchableOpacity style={styles.item} onPress={() => Redeem()}>
							<Text style={styles.itemVendor}>{item.vendor}</Text>
							<Text style={styles.itemDescription}>{item.description}</Text>
							<Image style={styles.itemImg} source={{ uri: item.image }} />
							<Text style={styles.itemCost}>{item.cost} Points</Text>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

export default RewardScreen;

const styles = StyleSheet.create({
	header: {
		backgroundColor: "white",
		height: 220,
		justifyContent: "center",
		alignItems: "center",
		borderBottomEndRadius: BOX.borderRadius,
		borderBottomStartRadius: BOX.borderRadius,
		marginBottom: 10,
	},
	pointsDisplay: {
		backgroundColor: COLORS.primary,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: BOX.borderRadius,
		paddingVertical: 7,
		paddingHorizontal: 15,
	},
	/****** item box design**********/
	item: {
		height: 250,
		marginBottom: 10,
		backgroundColor: "white",
		width: "49%",
		borderRadius: BOX.borderRadius,
		padding: box.base.padding,
	},
	itemVendor: {
		fontSize: FONT_SIZE.heading3,
		fontWeight: "700",
		marginBottom: 3,
	},
	itemDescription: {
		fontSize: FONT_SIZE.text,
		marginBottom: 3,
	},
	itemImg: {
		borderRadius: BOX.borderRadius,
		height: "100%",
		flex: 1,
		marginBottom: 3,
	},
	itemCost: {
		fontSize: 15,
		color: "green",
		textAlign: "center",
	},
});
