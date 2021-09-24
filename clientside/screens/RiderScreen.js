import React from 'react'
import { StyleSheet, View} from 'react-native'
import Map from '../components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DestinationCard from '../components/DestinationCard'
import { setDestination } from '../slices/sessionSlice'

async getDrivers() {
    if (!(this.state.validSID && this.state.validFN && this.state.validLN && this.state.validEmail && this.state.validPhone)) {
        console.log("Invalid signup details");
        return
    }
};

const RiderScreen = () => {
    const Stack = createNativeStackNavigator();
    
    return (
        <View>
            <View style={styles.view}><Map/></View>

            <View style={styles.view}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="DestinationCard"
                        component={DestinationCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </View>
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
