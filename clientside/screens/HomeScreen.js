import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { BOX } from "../stylesheets/theme";
import * as Location from "expo-location";

import DropOffModalButton from "../components/DropOffModalButton";
import HamburgerButton from "../components/HamburgerButton";
import SocketConnection from "../socket";
import RiderRequestModel from "../components/RiderRequestModal";

import ChatButton from "../components/ChatButton";

export default function HomeScreen() {
	const [latitude, setLatitude] = useState(-27.497);
	const [longitude, setLongitude] = useState(153.0134);
	const latitudeDelta = 0.005;
	const longitudeDelta = 0.005;
	const [onTrip, setOnTrip] = useState(false);
	connection = SocketConnection.getConnection()

	var TripMenu = onTrip ? 
		<View style={styles.bubble}>
			<ChatButton/>
			<Text>on a ride</Text>
		</View>
		: 
		<View style={styles.bubble}>
			<DropOffModalButton/>
			<Text>Book a ride</Text>
		</View> 
		;

	let base_rider = {
        first_name: "Bob",
        last_name:"Melham ducj",
        rider_id: 1214312421,
        image: "http://media.e2save.com/images/community/2015/02/Crazy-Frog.jpg",
		origin:"lmao",
		destination:"lmao"
    }

	const [isRiderRequestModalVisible, setRiderRequestModalVisible] = useState(false);
	let [rider, setRider] = useState(base_rider);


	function getMessage() {
		connection.recievePayload('ask').then( payload => {
			rider = JSON.parse(payload)			 
			setRider(rider)
			setRiderRequestModalVisible(true)
			getMessage()
			"ask driver to join pool lmao"
		})
	}

	function getPool() {
		connection.recievePayload('join').then( payload => {
			console.log("join pool lmao")
		})
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
			setLatitude(location.coords.latitude);
			setLongitude(location.coords.longitude);
			getMessage()

		})();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<RiderRequestModel open={isRiderRequestModalVisible} setModalVisible={setRiderRequestModalVisible} rider={rider}/>
			<HamburgerButton/>
			<MapView
				style={styles.map}
				showsMyLocationButton={true}
				showsUserLocation={true}
				region={{
					latitude: latitude,
					longitude: longitude,
					longitudeDelta: longitudeDelta,
					latitudeDelta: latitudeDelta,
				}}
			>
				<Marker
					coordinate={{
						latitude: latitude,
						longitude: longitude,
					}}
				/>
				
			</MapView>
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
