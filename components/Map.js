import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import { selectOrigin } from '../slices/sessionSlice';
import { useSelector } from 'react-redux';


const Map = () => {
    const origin = useSelector(selectOrigin);

    return (
        <MapView
            style={{
                display: 'flex',
                flex: 1,
            }}
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng
                    }}
                />
            )}
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})
