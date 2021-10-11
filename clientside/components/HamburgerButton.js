import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'; //required to move to another page

/**
 * This is a sample button which takes you to another page. 
 * 
 * To render this component on a page, you must add 
 *  ' <HamburgerButton/> ' to the page and ensure it has been imported like below 
 *  'import HamburgerButton from '../components/Samples/HamburgerButton';'
 */

const HamburgerButton = ( {/* Here you can add input variables and use them in your return method */} ) => {
    const navigation = useNavigation(); //required when moving to another page
    
    return (
        <TouchableOpacity 
            onPress={() => navigation.openDrawer()} // change this to whatever screen you want and add screen to App.js
            style={styles.button}
        >
            <Text>-</Text>
            <Text>-</Text>
            <Text>-</Text>
                    
        </TouchableOpacity>
    )
}

export default HamburgerButton

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 40,
        backgroundColor: 'grey',
    }
})
