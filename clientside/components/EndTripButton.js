import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	TextInput,
	Linking,
} from "react-native";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { BOX, COLORS, FONT_SIZE } from "../stylesheets/theme";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, selectDestination, selectLocation , selectDriver} from "../slices/sessionSlice";
import { selectSID } from "../slices/userSlice";
import { selectStatus, setStatus } from "../slices/sessionSlice";
import { UserStatus } from "../enums/UserStatus";
import fetch from 'node-fetch'; 


const EndTripButton = () => {
    const dispatch = useDispatch();
    const destination = useSelector(selectDestination);
    const location = useSelector(selectLocation);
    const driver = useSelector(selectDriver);
    const sid = useSelector(selectSID);
    const status = useSelector(selectStatus);
    const navigation = useNavigation();
    const latitude = location.coords.latitude
    const longitude = location.coords.longitude

	async function endTrip() {
        if (status == UserStatus.Riding) {
            let eta = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&region=au&origins='+latitude+','+longitude+'&destinations='+destination.description+'&key='+GOOGLE_MAPS_API_KEY)
            .then(res => res.json())
            .then(data => {return parseInt(data.rows[0].elements[0].duration.text)})
            .catch((err) => {
                console.log(err.message)
            });
            if (eta < 2) {
                const driverPoints = await fetch('https://uqpool.xyz:7777/points', {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sid: driver.driver_id,
                        points: driver.heuristic * 500
                    })
                });
                const riderPoints = await fetch('https://uqpool.xyz:7777/points', {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sid: sid,
                        points: driver.heuristic * 100
                    })
                });
                console.log("Trip succesful between" + driver.driver_id + " and " + sid)
            } else {
                console.log("Trip cancelled")
                //Nav to home screen
            }

            dispatch(setStatus(UserStatus.Idle))

        } else if (status == UserStatus.Driving) {
            
            //Add disconnect users
            dispatch(setStatus(UserStatus.Idle))
        }
	}

	return (
		<TouchableOpacity style={styles.button} onPress={() => endTrip()}>
			<Text style={{ fontSize: FONT_SIZE.heading2, color: "white" }}>
                End Trip
			</Text>
		</TouchableOpacity>
	);
};

export default EndTripButton;

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
