import React, { Component } from 'react'
import { StyleSheet, View, Image, SafeAreaView, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { COLORS, BOX } from '../stylesheets/theme'
import { useNavigation } from '@react-navigation/core'
import ValidatedTextInput from '../components/ValidatedTextInput'


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
            confirmPassword: "",
            validSID: false,
            validFN: false,
            validLN: false,
            validEmail: false,
            validPhone: false, 
            validPassword: false,
            validConfirmPassword: false,
        };
    }

    /* This section should check that registration was previously successful from the user slice.
    If so, don't render and just go straight to initial page
    else render    
    */
    componentDidMount() {}

    async registerUser() {

        // Check that all fields are valid
        if (!(this.state.validSID && this.state.validFN && this.state.validLN && this.state.validEmail && this.state.validPhone)) {
            console.log("Invalid signup details");
            return
        }

        try {
            const response = await fetch('https://uqpool.xyz:7777/user', {
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
                    phone: this.state.phone,
                    password: this.state.password
                })
            });

            const json = await response.json();
            if (json.msg =="User Succesfully Created") {
                // alert the user
                //navigation.navigate("LoginScreen") can't call hooks in function
            } else {
                console.log(json.msg);

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

                            <ValidatedTextInput
                                style={styles.input}
                                onChangeText={sid => this.setState({sid})}
                                placeholder="Student ID"
                                value={this.state.sid}
                                pattern={'^[0-9]{8,8}$'} //8Numbers
                                onValidation={validSID => this.setState({validSID})}
                            /> 

                            <ValidatedTextInput
                                style={styles.input}
                                onChangeText={firstName => {this.setState({firstName})}}
                                placeholder="First Name"
                                value={this.state.firstName}
                                pattern={'^[a-zA-Z]+'} //at least one char
                                onValidation={validFN => this.setState({validFN})}
                            /> 

                            <ValidatedTextInput
                                style={styles.input}
                                onChangeText={lastName => {this.setState({lastName})}}
                                placeholder="Last Name"
                                value={this.state.lastName}
                                pattern={'^[a-zA-Z]*'} //at least one char
                                onValidation={validLN => this.setState({validLN})}
                            /> 

                            <ValidatedTextInput
                                style={styles.input}
                                onChangeText={email => {this.setState({email})}}
                                placeholder="UQ Email"
                                value={this.state.email}
                                pattern={'^[a-zA-Z0-9.]+@uq.edu.au|[a-zA-Z0-9.]+@uqconnect.edu.au'} 
                                onValidation={validEmail => this.setState({validEmail})}
                            /> 

                            <ValidatedTextInput
                                style={styles.input}
                                onChangeText={phone => {this.setState({phone})}}
                                placeholder="Phone Number"
                                value={this.state.phoneNumber}
                                pattern={'^04[0-9]{8,8}$'} // 10 numbers starting with 04
                                onValidation={validPhone => this.setState({validPhone})}
                            /> 

                            <ValidatedTextInput
                                style={styles.input}
                                onChangeText={password => {this.setState({password})}}
                                placeholder="Password"
                                value={this.state.password}
                                onValidation={validPassword => this.setState({validPassword})}
                            /> 

                            <ValidatedTextInput
                                style={styles.input}
                                onChangeText={confirmPassword => {this.setState({confirmPassword})}}
                                placeholder="Confirm Password"
                                value={this.state.confirmPassword}
                                onValidation={validConfirmPassword => this.setState({validConfirmPassword})}
                            /> 

                            <TouchableOpacity 
                                // onPress={() => navigation.navigate("RegistrationScreen")} // change this to whatever screen you want and add screen to App.js
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