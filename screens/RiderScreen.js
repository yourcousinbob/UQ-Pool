import React from 'react'
import { StyleSheet, View} from 'react-native'
import Map from '../components/Map'



const RiderScreen = () => {
    return (
        <View>
            <View style={styles.view}><Map/></View>
            <View style={styles.view}></View>
        </View>
        
    )
}

export default RiderScreen

const styles = StyleSheet.create({
    view: {
        width: "100%",
        height: "50%",
    },
})
