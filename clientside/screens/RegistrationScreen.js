import React, { Component } from 'react'
import { StyleSheet, View, Image, SafeAreaView, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { COLORS, BOX } from '../stylesheets/theme'
import { useNavigation } from '@react-navigation/core'


export class RegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sid: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
        };
    }

    /* This section should check that registration was previously successful from the user slice.
    If so, don't render and just go straight to initial page
    else render    
    */
    componentDidMount() {}

    async registerUser() {
        try {
            const response = fetch('http://103.4.234.91:7777/user', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // not sure if we need the stringify tbh
                    sid: this.state.sid,
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    email: this.state.email,
                    phone: this.state.phone
                })
            });

            const json = await response.json;

            if (json.error != null) {
                // alert the user
            } else {
                console.log(json);
                // Switch to the initial state of the app
            }


        } catch (error) {
            console.log("Caught Error")
            console.log(error);
            
        } finally {
            // Just in case this is required
        }
    }

    render() {
        return (
                <View style={{backgroundColor: COLORS.primary,height: "100%", paddingTop: 50}}>
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
                
                    
                    <ScrollView style={{ height: "60%", width: "100%", backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        <View style={{ paddingVertical: 25}}>
                            <View style={styles.input}>
                                <TextInput
                                    onChangeText={sid => {this.setState({sid})}}
                                    placeholder="Student ID"
                                    value={this.state.sid}
                                />
                            </View>
                            
                            <View style={styles.input}>
                                <TextInput
                                    onChangeText={firstName => {this.setState({firstName})}}
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                />
                            </View>

                            <View style={styles.input}>
                                <TextInput
                                    onChangeText={lastName => {this.setState({lastName})}}
                                    placeholder="Last Name"
                                    value={this.state.lastName}
                                />
                            </View>

                            <View style={styles.input}>
                                <TextInput
                                    onChangeText={email => {this.setState({email})}}
                                    placeholder="UQ Email"
                                    value={this.state.email}
                                />
                            </View>

                            <View style={styles.input}>
                                <TextInput
                                    onChangeText={phone => {this.setState({phone})}}
                                    placeholder="Phone Number"
                                    value={this.state.phoneNumber}
                                />
                            </View>

                            <View style={styles.input}>
                                <TextInput
                                    onChangeText={password => {this.setState({password})}}
                                    placeholder="Password"
                                    value={this.state.password}
                                />
                            </View>

                            <View style={styles.input}>
                                <TextInput
                                    onChangeText={confirmPassword => {this.setState({confirmPassword})}}
                                    placeholder="Confirm Password"
                                    value={this.state.confirmPassword}
                                />
                            </View>

                            <TouchableOpacity 
                                // onPress={() => navigation.navigate("RegistrationScreen")} // change this to whatever screen you want and add screen to App.js
                                // onPress={() => console.log(this.state)} 
                                onPress={() => this.registerUser()}
                                style={styles.button}
                            >
                                <Text
                                    style={styles.buttonText}
                                >
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View> 
        )
    }
}

export default RegistrationScreen

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