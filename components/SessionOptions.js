import React from 'react';
import { Image, Text, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';

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
    return (
        <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.button}>
                    <View>
                        <Image 
                            style={styles.image}
                            source={{ uri: item.image }}
                        />
                        <Text style={styles.text}>
                            {item.title}
                        </Text>
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
    }
});

