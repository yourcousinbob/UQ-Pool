import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const SampleButton = () => {
    const navigation = useNavigation();

    return (
             <TouchableOpacity 
                    onPress={() => navigation.navigate("HomeScreen")}  // Change this to whatever page you want it to go to
                    style={styles.button}
            >
                <Text>This is a sample TouchableOpacity button.</Text>
            </TouchableOpacity>
            
    )
}

export default SampleButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: "green",
        padding: 2,
        paddingLeft: 6, 
        paddingBottom: 8,
        paddingTop: 4,
        margin:5,
        borderRadius:5,
        width: 100,
        height: 100
    }
})
