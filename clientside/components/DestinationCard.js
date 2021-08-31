import React from 'react'
import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/sessionSlice';

const DestinationCard = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.card}>
            <Text style={styles.text}>Good Morning, Nathan</Text>
            <View style={styles.view}>
                <View>
                    <GooglePlacesAutocomplete
                        styles={{
                            container: {
                                flex: 0,
                                backgroundColor: "white",
                                // padding: 10,
                            },
                            textInput: {
                                fontSize:18,
                                backgroundColor: "#DDDDDF",
                            },
                            textInputContainer: {
                                paddingHorizontal: 20,
                                padding: 10,
                            }
                        }}
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestination({
                                        location: details.geometry.location,
                                        description: data.description
                                    })
                            );
                        }}
                        returnKeyType={"search"}
                        query={{
                            key:GOOGLE_MAPS_API_KEY,
                            language: "en",
                        }}                        minLength={2}
                        enablePoweredByContainer={false}
                        placeholder="Where to?"
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DestinationCard

const styles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
        textAlign:'center',
        paddingVertical: 15,
    },
    view: {
        borderTopColor: "grey",
        borderTopWidth:1,
        flexShrink: 1,
    }
  });