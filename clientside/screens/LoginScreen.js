import React, { Component } from 'react'
import { StyleSheet, View, Image, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native'
import { COLORS, BOX } from '../stylesheets/theme'
import ValidatedTextInput from '../components/ValidatedTextInput'
import HomeScreen from './HomeScreen'


import { useNavigation } from '@react-navigation/core'
function RegistrationButton() {
    const navigation = useNavigation();
  
    return (
        <TouchableOpacity 
        onPress={() => navigation.navigate("RegistrationScreen")}
        style={styles.button}
    >
        <Text
            style={styles.buttonText}
        >
            Sign Up
        </Text>
    </TouchableOpacity>
    );
  }

function GoToHomescreen() {
    const navigation = useNavigation();
    navigation.navigate("HomeScreen")
}

export class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            validEmail: false,
            success: false,
            auth_token: ""
        };
    }

    /* This section should check that registration was previously successful from the user slice.
    If so, don't render and just go straight to initial page
    else render    
    */
    componentDidMount() {}

    async loginUser() {

        // Check that all fields are valid
        if (!(this.state.validEmail)) {
            console.log("Invalid Email Format");
            return
        }

        try {
            const response = await fetch('http://103.4.234.91:7777/login', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // not sure if we need the stringify tbh
                    email: this.state.email,
                    password: this.state.password
                })
            });

            const json = await response.json();
            if (json.msg =="Successful Login") {
                // alert the user
                this.state.success = true;
                this.auth_token = json.auth;
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
        <View style={{backgroundColor: COLORS.primary,height: "100%"}}>
            <View style={{display:'flex', flexDirection: 'column', paddingTop: 50}}>
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
                    <ValidatedTextInput
                        style={styles.input}
                        onChangeText={email => {this.setState({email})}}
                        placeholder="Email"
                        value={this.state.email}
                        pattern={'^[a-zA-Z0-9_\-]*@uq.edu.au'} //uq domain, NEED TO FIX
                        onValidation={validEmail => this.setState({validEmail})}
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={password => {this.setState({password})}}
                        placeholder="Password"
                        value={this.state.password}
                    />

                    <TouchableOpacity 
                        onPress={() => this.loginUser()}
                        style={styles.button}
                    >
                        <Text
                            style={styles.buttonText}
                        >
                            Log In
                        </Text>
                    </TouchableOpacity>
                    <RegistrationButton/>

 

                </View>
            </View> 
        </View>
    );
  }
}
  
export default LoginScreen
  
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