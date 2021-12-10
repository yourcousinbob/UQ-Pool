import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from "react-native";
import Modal from "react-native-modal";
import { BOX, COLORS, FONT_SIZE, box } from "../stylesheets/theme";
import { colors, Icon } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "react-native-elements/dist/image/Image";
import { UserStatus } from "../enums/UserStatus";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, selectDestination, setStatus , setDriver, selectDriver} from "../slices/sessionSlice";
import { selectSID } from "../slices/userSlice";
import SocketConnection from '../socket.js';

//driver details
let driver_list = [
    {
        first_name: "Bob",
        last_name:"Melhem",
        driver_id: 1214312421,
        heuristic: "12",
        image: "http://media.e2save.com/images/community/2015/02/Crazy-Frog.jpg",
        location:"",
        desination:"",
        eta:1
    },
];

/**
 * 
 * 
 */
const DriverListModalButton = () => {
	const [isModalVisible, setModalVisible] = useState(false);
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

    const dispatch = useDispatch();
    const destination = useSelector(selectDestination);
    const origin = useSelector(selectOrigin);
    const sid = useSelector(selectSID);

    //testing
    /**
     * Fetches the list of drivers from backend
     * @param {String} sid UQ student ID
     * @param {String} location starting location address
     * @param {String} destination end location address
     * @param {any} dispatch dispatch function
     */
    async function getDrivers(sid, location, destination, dispatch) {
        connection = SocketConnection.getConnection();
        let data = ({
            sid: sid,
            location: location.description,
            destination: destination.description
        });
        connection.sendPayload('get', data);
        connection.recievePayload('get').then(payload => {
            driver_list = payload.drivers
            toggleModal()
        })
        dispatch(setStatus(UserStatus.WaitingForDriver));
    };

    /**
     * Action of requesting a driver
     * @param {String} sid UQ student ID
     * @param {String} driver_id Unique Driver ID
     * @param {String} origin starting location address
     * @param {String} destination end location address
     * @param {any} dispatch dispatch function
     */
    async function requestDriver(sid, driver, origin, destination, dispatch) {
        connection = SocketConnection.getConnection();
        let data = ({
            sid: sid,
            driver_id: driver.driver_id,
            origin: origin.description,
            destination: destination.description
        })
        connection.sendPayload("request", data)
        dispatch(setDriver(driver))
    };

    /**
     * Frontend display of available drivers
     */
    function DriverListModal() {
        return (
            <View>
                <Modal
                    isVisible={isModalVisible}
                    onSwipeComplete={() => setModalVisible(false)}
                    onBackdropPress={() => setModalVisible(false)}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    swipeThreshold={300}
                    avoidKeyboard={false}
                    style={{
                        margin: 0,
                    }}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalHeader}>Drivers</Text>
                        <FlatList style={styles.list}
                            data={driver_list}
                            contentContainerStyle={styles.listContainer}
                            numColumns={1}
                            horizontal={false}

                            keyExtractor= {(item) => {
                                return item.driver_id;
                            }}
                            /*Padding between rows */
                            ItemSeparatorComponent={() => {
                                return (
                                <View style={styles.verticalSeparator}/>
                                )
                            }}
                            renderItem={(post) => {
                                const item = post.item;
                                return (
                                    <View style={styles.driver}>
                                        <View>
                                            <TouchableOpacity style={styles.driverRequestButton} onPress={() => requestDriver(sid, item, origin, destination, dispatch)}>
                                                <Text style={styles.driverName}>{item.first_name} {item.last_name}</Text>
                                                <Image style={styles.driverImage} source={{uri:item.image}}/> 
                                                <Text style={styles.driverName}>Location: {item.location}</Text>
                                                <Text style={styles.driverName}>Destination: {item.destination}</Text>
                                                <Text style={{textAlign:"center"}}>Request This Driver</Text>
                                            </TouchableOpacity>
                                    </View>
                                    </View>

                                )
                            }}
                        />
                    </View>
                </Modal>
            </View>
        );
    }

    return (

		<TouchableOpacity style={[box.base, styles.sessionButtons]} onPress={() => getDrivers(sid, origin, destination, dispatch)}>
			<Text style={styles.sessionButtonsText}>
				Be A Rider
			</Text>
			<DriverListModal/>
		</TouchableOpacity>
	);
}

//allows us to import to other pages
export default DriverListModalButton;

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
    sessionButtons: {
        backgroundColor: COLORS.primary,
        marginHorizontal: 15,
    },
    sessionButtonsText: {
        fontSize: FONT_SIZE.text,
        color: "white",
    },


	modalHeader: {
        textAlign: 'center',
		fontSize: FONT_SIZE.heading3,
		fontWeight: "bold",
		marginBottom: 10,
	},

    driver:{
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: BOX.borderRadius,
        borderColor: "black",
        padding: 5,
        margin: 2,
    },

    driverName:{
        fontWeight: "bold",
        
    },

    driverRequestButton:{

    },

    driverImage:{
        flex: 1,
        height: 80,
        width: 80,
        borderRadius: 40,
        overflow: 'hidden'
        /* width: null, */
    },
});
