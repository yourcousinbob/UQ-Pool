import React from 'react'
import { StyleSheet, View, Image, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native'
import { COLORS, BOX } from '../stylesheets/theme'
import { useNavigation } from '@react-navigation/core'
  
const RegistrationScreen = () => {     
    const navigation = useNavigation(); //required when moving to another page

    return (
        <View style={{backgroundColor: COLORS.primary,height: "100%"}}>
            <View style={{display:'flex', flexDirection: 'column', paddingTop: 50}}>
                <View style={{height: "40%", width: "100%", padding: 20}}>
                    <Image
                        style={{
                            resizeMode: 'contain',
                            height: "90%",
                            width: "100%"
                        }}
                        source={
                            require('../assets/registrationPicture.png')
                        }
                    />
                </View>
               
                <View style={{height: "60%", width: "100%", backgroundColor: "white", borderTopStartRadius: 20,  borderTopEndRadius: 20, paddingVertical: 25}}>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Name"
                        />
                    </View>

                    <View style={styles.input}>
                        <TextInput
                            placeholder="Email"
                        />
                    </View>

                    <View style={styles.input}>
                        <TextInput
                            placeholder="Password"
                        />
                    </View>

                    <View style={styles.input}>
                        <TextInput
                            placeholder="Confirm Password"
                        />
                    </View>


                    <TouchableOpacity 
                        // onPress={() => navigation.navigate("RegistrationScreen")} // change this to whatever screen you want and add screen to App.js
                        style={styles.button}
                    >
                        <Text
                            style={styles.buttonText}
                        >
                            Register
                        </Text>
                    </TouchableOpacity>

                </View>
            </View> 
        </View>
    );
  }
  
export default RegistrationScreen;
  
const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        paddingHorizontal: "3%",
        paddingVertical:"4%",
        marginVertical: "1%",
        marginHorizontal: "7%",
        borderRadius: BOX.borderRadius,
        borderColor: COLORS.primary,
        borderWidth: 1,
    },
    button: {
        backgroundColor: COLORS.primary,
        marginHorizontal: "25%",
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: BOX.borderRadius,
    },

    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16
    }
});