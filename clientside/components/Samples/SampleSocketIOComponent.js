import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'
import io from "socket.io-client";

/**
 * This class is an example of how to use the SocketIO server. This component 
 * renders a input box which takes a username and sends it to the server, 
 * which then stores the socket with the user. Ideally we would be using the 
 * redux store to manage the socket, and username etc. 
 */
export class SampleSocketIOComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
           username: ""

        };
     }

    componentDidMount() {
        this.socket = io("http://127.0.0.1:7777");
    }

    login() {
        var body = {"user":this.state.username}
        this.socket.emit('login', body);
        this.setState({ username: "" });
    }


    render() {
        return (
            <View>
                <Text> Test the socketio by sending login </Text>
                <TextInput
                    style={{
                        borderWidth: 5,
                        height: 50,
                    }}
                    value={this.state.username}
                    autoCorrect={false}
                    onSubmitEditing={() => this.login()}
                    onChangeText={username => {
                        this.setState({username});
                    }}
                />
            </View>
        )
    }
}

export default SampleSocketIOComponent
