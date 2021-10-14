import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { BOX, COLORS, FONT_SIZE } from "../stylesheets/theme";
import { Icon } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "react-native-elements/dist/image/Image";

const drivers = [
    {
        name: "Bob Melham",
        distance: "12",
        image: "http://media.e2save.com/images/community/2015/02/Crazy-Frog.jpg"
    },
    {
        name: "James Robins",
        distance: "23",
        image: "http://media.e2save.com/images/community/2015/02/Crazy-Frog.jpg"
    },
];

export default function DriverListModal() {

    const [isModalVisible, setModalVisible] = useState(true);
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

    return (
        <View>
            <Modal
                isVisible={isModalVisible}
                onSwipeComplete={() => setModalVisible(false)}
                // onBackdropPress={() => setModalVisible(false)}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                swipeThreshold={300}
                style={{
                    margin: 0,
                }}
            >
                <View style={styles.modal}>
                    <Icon type="ionicon" name="remove-outline" size={25} />
                    <Text style={styles.modalHeader}>Drivers</Text>
                    <FlatList style={styles.list}
                        data={drivers}
                        contentContainerStyle={styles.listContainer}
                        numColumns={1}
                        horizontal={false}

                        keyExtractor= {(item) => {
                            return item.name;
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
                            <View style={styles.items}>
                            
                            <View style={styles.itemHead}>
                                <View>
                                    <Text style={styles.distance}>{item.name}</Text>
                                </View>
                                </View>

                                <Image style={styles.itemImg} source={{uri:item.image}}/> 
                                
                                
                                <View style={styles.itemFooter}>
                                    <View style={styles.barContainer}>
                                        <View style={styles.barSection}>
                                            <TouchableOpacity style={styles.barButton} onPress={() => this.Redeem()}>
                                                <Text style={[styles.barLabel, styles.redeemText]}>Book Driver</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
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
});