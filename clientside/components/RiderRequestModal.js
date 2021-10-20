import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from "react-native";
import Modal from "react-native-modal";
import { BOX, COLORS, FONT_SIZE } from "../stylesheets/theme";
import { Icon } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "react-native-elements/dist/image/Image";
import { UserStatus } from "../enums/UserStatus";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, selectDestination, setStatus } from "../slices/sessionSlice";
import { selectSID } from "../slices/userSlice";
import SocketConnection from '../socket.js';


const RiderRequestModel = (props) => {

    const isModalVisible =  props.open
    const setModalVisible = props.setModalVisible
    const dispatch = useDispatch();
    const sid = useSelector(selectSID);

    const rider_id = props.rider.sid
    const rider_image = props.rider.image
    const rider_first_name = props.rider.first_name
    const rider_last_name = props.rider.last_name

    async function rejectRider(sid, rider_id, dispatch) {
        connection = SocketConnection.getConnection();
        let data = ({
            sid: sid,
            rider_id: rider_id,
        });
        console.log(data)
        connection.sendPayload('reject', data);
        dispatch(setStatus(UserStatus.WaitingForRider));
    };

    async function acceptRider(sid, rider_id, dispatch) {
        connection = SocketConnection.getConnection();
        let data = ({
            sid: sid,
            rider_id: rider_id,
        });
        connection.sendPayload('accept', data);
        dispatch(setStatus(UserStatus.Riding));
    }

    return (
        <View>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                swipeThreshold={300}
                style={{
                    margin: 0,
                }}
            >
                <View style={styles.modal}>
                    <View style={styles.driver}>
                        <Image style={styles.driverImage} source={{uri:rider_image}}/> 
                        <Text style={styles.driverName}>{rider_first_name} {rider_last_name}</Text>
                    </View>
                    <View style={styles.options}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{}}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{}}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </Modal>
        </View>
    );
    
}
export default RiderRequestModel;

const styles = StyleSheet.create({
	driver:{
        height: "50%",
        width: "100%",
        flexDirection: "row",
    },

    driverName:{
        fontWeight: "bold",
        
    },

    driverImage:{
        position: "relative",
        height: 80,
        width: 80,
        borderRadius: 40,
        overflow: 'hidden'
    },

    modal: {
		backgroundColor: "white",
		position: "absolute",
		bottom: "40%",
        height: "20%",
        width: "80%",
        left: "10%",
		borderTopLeftRadius: BOX.borderRadius,
		borderTopRightRadius: BOX.borderRadius,
        borderBottomLeftRadius: BOX.borderRadius,
        borderBottomRightRadius: BOX.borderRadius,
		padding: 15,
		paddingTop: 5,
        flexDirection: "column",
	},

    options: {
        flexDirection: "row",
        height: "50%",
        width: "100%",
    },

    button: {
		backgroundColor: COLORS.primary,
		borderRadius: BOX.borderRadius,
        height: "66%",
        width:"33%",

	},
});