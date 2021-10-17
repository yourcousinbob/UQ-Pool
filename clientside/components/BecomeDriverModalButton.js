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


const BecomeDriverModalButton = () => {
	const [isModalVisible, setModalVisible] = useState(false);
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

    const dispatch = useDispatch();
    const destination = useSelector(selectDestination);
    const origin = useSelector(selectOrigin);
    const sid = useSelector(selectSID);
    const registration = "ABC444";
    const capacity = 2;

    async function becomeDriver(sid, location, destination, registration, capacity, dispatch) {
        connection = SocketConnection.getConnection();
        let data = ({
            sid: sid,
            location: location.description,
            destination: destination.description,
            registration: registration,
            capacity: capacity
        });
        console.log(data)
        connection.sendPayload('add', data);
        connection.recievePayload('add');
        dispatch(setStatus(UserStatus.WaitingForRider));
    };

    async function removeDriver(sid, dispatch) {
        connection = SocketConnection.getConnection();
        let data = ({
            sid: sid
        });
        connection.sendPayload('removeDriver', data);
        connection.recievePayload('removeDriver');
        dispatch(setStatus(UserStatus.Waiting));
    }

    function BecomeDriverModal() {
        
        return (
            <View>
                <Modal
                    isVisible={isModalVisible}
                    onSwipeComplete={() => setModalVisible(false)}
                    onBackdropPress={() => setModalVisible(false)}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    swipeThreshold={300}
                    style={{
                        margin: 0,
                    }}
                >
                    <View style={styles.modal}>
                        <Icon type="ionicon" name="remove-outline" size={25} />
                        <Text style={styles.modalHeader}>Become A Driver!</Text>
                        <TouchableOpacity 
                            onPress={() => becomeDriver(sid, origin, destination, registration, capacity, dispatch)}
                            style={styles.sessionButtons}
                        >
                            <Text style ={styles.sessionButtonsText}>Click to join the active drivers queue and be assigned a rider</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => removeDriver(sid, dispatch)}
                            style={styles.sessionButtons}
                        >
                            <Text style ={styles.sessionButtonsText}>Exit the queue</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>
            </View>
        );
    }

    return (
		<TouchableOpacity style={styles.button} onPress={toggleModal}>
			<Text style={{ fontSize: FONT_SIZE.heading2, color: "white" }}>
				Be A Driver
			</Text>
			<BecomeDriverModal/>
		</TouchableOpacity>
	);
}

export default BecomeDriverModalButton;

const styles = StyleSheet.create({
	modal: {
		backgroundColor: "white",
		position: "absolute",
		bottom: "10%",
        height: "80%",
		borderTopLeftRadius: BOX.borderRadius,
		borderTopRightRadius: BOX.borderRadius,
        borderBottomLeftRadius: BOX.borderRadius,
        borderBottomRightRadius: BOX.borderRadius,
		width: "80%",
        left: "10%",
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
        textAlign: 'center',
		fontSize: FONT_SIZE.heading3,
		fontWeight: "bold",
		marginBottom: 10,
	},

    itemImg:{
        flex: 1,
        height: 155,
        /* width: null, */
    },

    sessionButtons: {
        backgroundColor: COLORS.primary,
        marginHorizontal: 15,
    },

    sessionButtonsText: {
        fontSize: FONT_SIZE.text,
        color: "white",
    },
});