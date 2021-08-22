import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import SessionOptions from '../components/SessionOptions';

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
                <SessionOptions/>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
});
