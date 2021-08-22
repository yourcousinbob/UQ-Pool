import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Map from '../components/Map'

const MapScreen = () => {
    return (
        <View>
            <View style={styles.view}>
                <Map/>
            </View>
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
