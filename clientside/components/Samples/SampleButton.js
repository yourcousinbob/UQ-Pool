import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'; //required to move to another page

/**
 * This is a sample button which takes you to another page. 
 * 
 * To render this component on a page, you must add 
 *  ' <SampleButton/> ' to the page and ensure it has been imported like below 
 *  'import SampleButton from '../components/Samples/SampleButton';'
 */

const SampleButton = ( {/* Here you can add input variables and use them in your return method */} ) => {
    const navigation = useNavigation(); //required when moving to another page
    
    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate("HomeScreen")} // change this to whatever screen you want and add screen to App.js
            style={styles.button}
        >
            <Text>This is a sample touchable opacity button.</Text>
            <Text>Clicking on this buttoncan navigate you to another screen.</Text>
                    
        </TouchableOpacity>
    )
}

export default SampleButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: "green",
        borderRadius: 5, 
        height: 200,
        width: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
