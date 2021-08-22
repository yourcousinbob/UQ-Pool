import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { Icon } from "react-native-elements";

const data = [
    {
        id: "123",
        title: "Be a rider",
        image: "https://links.papareact.com/3pn",
        screen: "RiderScreen",
    },
    {
        id: "456",
        title: "Be a driver",
        image: "https://links.papareact.com/3pn",
        screen: "DriverScreen",
    },
];

const SessionOptions = () => {
    const navigation = useNavigation();

    return (
        <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity 
                onPress={() => navigation.navigate(item.screen)}
                style={styles.button}>
                    <View>
                        <Image 
                            style={styles.image}
                            source={{ uri: item.image }}
                        />
                        <Text style={styles.text}>
                            {item.title}
                        </Text>
                        <Icon  style={styles.icon} name="arrowright" color="white" type="antdesign" />
                    </View>
                    
                </TouchableOpacity>
            )}
        />
    );
};

export default SessionOptions;

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        resizeMode: "contain",

    },
    button: {
        backgroundColor: "rgba(181, 181, 181, 0.40)",
        padding: 2,
        paddingLeft: 6, 
        paddingBottom: 8,
        paddingTop: 4,
        margin:5,
        borderRadius:5,
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    icon: {
        backgroundColor: 'grey',
        borderRadius: 100,
        marginTop: 5,
    }
});

