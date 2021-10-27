import React, {useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from "react-native";
import Modal from "react-native-modal";
import { BOX, COLORS, FONT_SIZE, box } from "../stylesheets/theme";
import { Icon } from "react-native-elements";
import { UserStatus } from "../enums/UserStatus";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, selectDestination, setStatus } from "../slices/sessionSlice";
import { selectSID } from "../slices/userSlice";
import SocketConnection from '../socket.js';

/**
 * Registers the user as a driver in the backend,
 * by pressing this button.
 */
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

    /**
     * Adds to the driver list in the backend
     * @param {string} sid UQ student ID
     * @param {string} location current driver location address
     * @param {string} destination driver destination address
     * @param {string} registration drivers car registration
     * @param {int} capacity capacity of car
     * @param {any} dispatch dispatch function
     */
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

    /**
     * Removes driver from list in backend
     * @param {string} sid UQ student ID
     * @param {any} dispatch dispatch function
     */
    async function removeDriver(sid, dispatch) {
        connection = SocketConnection.getConnection();
        let data = ({
            sid: sid
        });
        connection.sendPayload('removeDriver', data);
        connection.recievePayload('removeDriver');
        dispatch(setStatus(UserStatus.Waiting));
    }

    /**
     * Function that allows the user to 
     * set themselves as a driver and wait
     * in a queue for riders
     */
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
		<TouchableOpacity style={[box.base, styles.sessionButtons]} onPress={toggleModal}>
			<Text style={styles.sessionButtonsText}>
				Be A Driver
			</Text>
			<BecomeDriverModal/>
		</TouchableOpacity>
	);
}

//allows us to import to other pages
export default BecomeDriverModalButton;

//styling of components
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
    sessionButtons: {
        backgroundColor: COLORS.primary,
        marginHorizontal: 15,
    },
    sessionButtonsText: {
        fontSize: FONT_SIZE.text,
        color: "white",
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