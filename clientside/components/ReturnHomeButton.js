import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'; //required to move to another page

/**
 * This is a sample button which takes you to another page. 
 * 
 * To render this component on a page, you must add 
 *  ' <ReturnHomeButton/> ' to the page and ensure it has been imported like below 
 *  'import ReturnHomeButton from '../components/Samples/ReturnHomeButton';'
 */

const ReturnHomeButton = ( {/* Here you can add input variables and use them in your return method */} ) => {
    const navigation = useNavigation(); //required when moving to another page
    
    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate("Home")} // change this to whatever screen you want and add screen to App.js
            style={styles.button}
        >
            <Text> &lt; </Text>
      
        </TouchableOpacity>
    )
}

export default ReturnHomeButton

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
