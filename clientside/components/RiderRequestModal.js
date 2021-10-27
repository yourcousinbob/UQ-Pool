import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from "react-native";
import Modal from "react-native-modal";
import { BOX, COLORS, FONT_SIZE } from "../stylesheets/theme";
import { Image } from "react-native-elements/dist/image/Image";
import { UserStatus } from "../enums/UserStatus";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, selectDestination, setStatus } from "../slices/sessionSlice";
import { selectSID } from "../slices/userSlice";
import SocketConnection from '../socket.js';

/**
 * Rider Request actions
 */
const RiderRequestModel = (props) => {

    const isModalVisible =  props.open
    const setModalVisible = props.setModalVisible
    const dispatch = useDispatch();

    const sid = useSelector(selectSID);
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)

    const rider_id = props.rider.sid
    const rider_origin = props.rider.origin
    const rider_destination = props.rider_origin

    const rider_image = props.rider.image
    const rider_first_name = props.rider.first_name
    const rider_last_name = props.rider.last_name

    /**
     * sends request to reject rider
     * @param {String} sid UQ student ID
     * @param {int} rider_id unique rider ID
     * @param {any} dispatch dispatch function
     */
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

    /**
     * sends request to accept rider
     * @param {String} sid UQ student ID
     * @param {String} origin driver starting location
     * @param {String} destination driver destination address
     * @param {int} rider_id rider unique ID
     * @param {String} rider_origin ride starting location address
     * @param {String} rider_destination rider destination address
     * @param {any} dispatch dispatch function
     */
    async function acceptRider(sid, origin, destination, rider_id, rider_origin, rider_destination, dispatch) {
        connection = SocketConnection.getConnection();
        let data = ({
            driver_id: sid,
            driver_origin: origin,
            driver_destination: destination,

            rider_id: rider_id,
            rider_origin:rider_origin,
            rider_destination: rider_destination,
        });
        connection.sendPayload('accept', data);
        dispatch(setStatus(UserStatus.Driving));
    }

    //Front end modal view of rider request
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
                        <Text style={styles.origin}>Location: {rider_origin}</Text>
                        <Text style={styles.destination}>Destination: {rider_destination}</Text>

                    </View>
                    <View style={styles.options}>
                        <TouchableOpacity style={styles.button}
                        onPress={() => acceptRider(sid, origin, destination, rider_id, rider_origin, rider_destination, dispatch)}>
                            <Text style={styles.optionsText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                        onPress={() => rejectRider(sid, rider_id, dispatch)}>
                            <Text style={styles.optionsText}>Reject</Text>
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
        bottom: "0%",
        height: "20%",
        width: "80%",
        left: "10%",
    },

    driverName:{
        position:"absolute",
        top: "20%",
        fontWeight: "bold",
        
    },

    driverImage:{
        position: "absolute",
        borderRadius: 40,
        overflow: 'hidden'
    },

    origin:{
        top:"70%",
        borderRadius: 40,
        overflow: 'hidden'
    },

    destination:{
        top:"100%",
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
        top: "20%",
        left:"20%",
        height: "50%",
        width: "100%",
    },

    optionsText: {
        fontSize: FONT_SIZE.text,
        color: "white",
    },

    button: {
		backgroundColor: COLORS.primary,
		borderRadius: BOX.borderRadius,
        height: "66%",
        width:"33%",

	},
});
