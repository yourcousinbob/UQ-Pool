import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { BOX, FONT_SIZE } from "../stylesheets/theme";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import {
	setDriver,
	setLocation,
	selectDriver,
	selectOrigin,
	selectDestination,
	selectStatus,
	setStatus,
} from "../slices/sessionSlice";

import DropOffModalButton from "../components/DropOffModalButton";
import HamburgerButton from "../components/HamburgerButton";
import SocketConnection from "../socket";
import RiderRequestModel from "../components/RiderRequestModal";

import ChatButton from "../components/ChatButton";
import GoogleMapsButton from "../components/GoogleMapsButton";
import Map from "../components/Map";

import { UserStatus } from "../enums/UserStatus";
import { selectFirst, selectSID } from "../slices/userSlice";

export default function HomeScreen() {
	const userStatus = useSelector(selectStatus);
	connection = SocketConnection.getConnection();
	const name = useSelector(selectFirst);

	var TripMenu =
		userStatus == UserStatus.Riding || userStatus == UserStatus.Driving ? (
			<View style={styles.bubble}>
				<ChatButton />
				<GoogleMapsButton />
				<Text>On a Ride</Text>
			</View>
		) : (
			<View style={styles.bubble}>
				<Text
					style={{
						fontSize: FONT_SIZE.text,
						paddingLeft: 10,
						paddingBottom: 10,
					}}
				>
					Hello, {name}
				</Text>
				<DropOffModalButton />
			</View>
		);
	const sid = useSelector(selectSID);
	const dispatch = useDispatch();
	const driver = useSelector(selectDriver);
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);

	let base_rider = {
		first_name: "Bob",
		last_name: "Melhem ducj",
		rider_id: 1214312421,
		image: "http://media.e2save.com/images/community/2015/02/Crazy-Frog.jpg",
		origin: "lmao",
		destination: "lmao",
	};

	const [isRiderRequestModalVisible, setRiderRequestModalVisible] =
		useState(false);
	let [rider, setRider] = useState(base_rider);

	function getMessage() {
		connection.recievePayload("ask").then((payload) => {
			setRider(payload);
			setRiderRequestModalVisible(true);
			getMessage();
			("ask driver to join pool lmao");
		});
	}

	function getPool(dispatch, sid) {
		connection.recievePayload("join").then((payload) => {
			let driver = {
				sid: payload.driver_id,
				origin: payload.driver_origin,
				destination: payload.driver_destination,
			};
			console.log("lmao");
			const userStatus =
				driver.sid == sid ? UserStatus.Driving : UserStatus.Riding;
			console.log(sid);
			if (userStatus == UserStatus.Riding) {
				console.log("1");
			} else {
				console.log("2");
			}
			dispatch(setStatus(userStatus));
			dispatch(setDriver(driver));
			getPool(dispatch, sid);
		});
	}

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				alert("Permission to access foreground location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.BestForNavigation,
			});

			dispatch(setLocation(location));
			console.log(driver);
			getMessage();
			getPool(dispatch, sid);
		})();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<RiderRequestModel
				open={isRiderRequestModalVisible}
				setModalVisible={setRiderRequestModalVisible}
				rider={rider}
			/>
			<HamburgerButton />
			<Map />
			{TripMenu}
		</View>
	);
}

const styles = StyleSheet.create({
	map: {
		width: "100%",
		height: "100%",
		position: "absolute",
		zIndex: -1,
	},
	bubble: {
		backgroundColor: "white",
		borderRadius: BOX.borderRadius,
		marginHorizontal: "10%",
		padding: 15,
		width: "80%",
		position: "absolute",
		bottom: "15%",
		display: "flex",
		shadowOffset: { height: 4 },
		shadowOpacity: 0.6,
		shadowRadius: 8,
		shadowColor: "gray",
		elevation: 7,
	},
	tripoptions: {
		backgroundColor: "white",
		borderRadius: BOX.borderRadius,
		marginHorizontal: "10%",
		padding: 15,
		width: "80%",
		position: "absolute",
		bottom: "15%",
		display: "flex",
	},
});
