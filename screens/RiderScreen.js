import React from 'react'
import { StyleSheet, Text, View, SafeAreaView} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/sessionSlice"



const RiderScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={{backgroundColor:"white", height:"100%"}}>
            <View style={{padding:20}}>
            <GooglePlacesAutocomplete 
                        styles={{
                            container: {
                                flex: 0,
                            },
                            textInput: {
                                fontSize:18,
                            }
                        }}
                        onPress={(data, details = null) => {
                            dispatch(
                                setOrigin({
                                    location: details.geometry.location,
                                    description: data.description
                                })
                            );

                            dispatch(setDestination(null));
                        }}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        minLength={2}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_MAPS_API_KEY,
                            language: 'en'
                        }}
                        placeholder="Where are you going?"
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                />
            </View>   
        </SafeAreaView>
    )
}

export default RiderScreen

const styles = StyleSheet.create({})
