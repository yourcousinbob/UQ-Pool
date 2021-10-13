import React from 'react'
import { StyleSheet, View} from 'react-native'
import { COLORS, BOX } from '../stylesheets/theme'
import Map from '../components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DestinationCard from '../components/DestinationCard'


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
                <SampleButton
                    onPress={() => getDrivers()}
                    style={styles.button}
                />
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
    button: {
        backgroundColor: COLORS.primary,
        marginHorizontal: "25%",
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: BOX.borderRadius,
    },
})
