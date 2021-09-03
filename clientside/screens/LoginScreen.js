import React from 'react'
import { StyleSheet, View, Image, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native'
import { COLORS, BOX } from '../stylesheets/theme'
  
const LoginScreen = () => {     
    return (
        <SafeAreaView style={{backgroundColor: COLORS.primary,height: "100%"}}>
            <View style={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 50}}>

                <View style={{height: "55%", width: "100%", padding: 20}}>
                    <Image
                        style={{
                            resizeMode: 'contain',
                            height: "90%",
                            width: "100%"
                        }}
                        source={
                            require('../assets/loginPicture.png')
                        }
                    />
                </View>
               
                <View style={{height: "45%", width: "100%", backgroundColor: "white", borderTopStartRadius: 20,  borderTopEndRadius: 20, paddingVertical: 25}}>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Username"
                        />
                    </View>

                    <View style={styles.input}>
                        <TextInput
                            placeholder="Password"
                        />
                    </View>

                    <TouchableOpacity 
                        style={{
                            backgroundColor: COLORS.primary,
                            marginHorizontal: 40,
                            marginTop: 25,
                            paddingVertical: 10,
                            borderRadius: BOX.borderRadius
                            
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                textAlign: "center",
                            }}
                        >
                            Email
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{
                            backgroundColor: COLORS.primary,
                            marginHorizontal: 40,
                            marginTop: 10,
                            paddingVertical: 10,
                            borderRadius: BOX.borderRadius
                            
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                textAlign: "center",
                            }}
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>

                </View>
            </View> 
        </SafeAreaView>
    );
  }
  
export default LoginScreen;
  
const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: BOX.borderRadius,
        borderColor: COLORS.primary,
        borderWidth: 1
    },
});