import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MapScreen = () => {
    return (
        <View>
            <Text>This is the Map Stuff</Text>

            <View style={styles.view}></View>
            <View style={styles.view}></View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    view: {
        width: "100%",
        height: "50%",
    },
})
