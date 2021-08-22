import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import SessionOptions from '../components/SessionOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from "@env";

const HomeScreen = () => {
    return (
        <SafeAreaView style={{backgroundColor:"white", height:"100%"}}>
            <View style={{padding:20}}>
                <Image
                    style={{
                        width: 200, height: 100, resizeMode: 'contain',
                    }}
                    source={
                        require('../assets/logo.png')
                    }
                />

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
                            console.log(data);
                            console.log(details);
                        }}
                        fetchDetails={true}
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

                <SessionOptions/>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
});
