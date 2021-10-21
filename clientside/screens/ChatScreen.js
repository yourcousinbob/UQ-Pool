import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { selectDriver } from '../slices/sessionSlice';
import { selectSID } from '../slices/userSlice';
import SocketConnection from '../socket';

const ChatScreen = () => {

    const [messages, setMessages] = useState([]);
    const driver_id = useSelector(selectDriver).sid;
    const sid = useSelector(selectSID)
    connection = SocketConnection.getConnection();

    function getMessage(messages) {
		connection.recievePayload('sendMessage').then(payload => {
            console.log(payload)
            console.log("lol")
            console.log(messages)

			setMessages(messages => GiftedChat.append(messages, payload.messages));
            getMessage(messages);
		})
	}

    function sendMessage(sid, driver_id, message) {

        let data = ({
            sid: sid,
            driver_id: driver_id,
            message: message,
        });
        console.log(data)
        connection.sendPayload("sendMessage", data)
    }

    useEffect(() => {
        setMessages([
            {
                _id: 69,
                text: 'whaaaat up?',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'passenger',
                },
            },
        ])
        console.log("lmao")
        console.log(messages)
        getMessage(messages)
    }, [])

    const renderInputToolbar = (props) => {
        return (
            <InputToolbar{...props}
            //containerStyle={{ backgroundColor: '#4B2876' }}
            >
            </InputToolbar>
        )
    }
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name='send-circle'
                        size={32}
                        style={{ marginBottom: 5, marginRight: 5 }}
                        color='#4B2876' />
                </View>
            </Send>
        )
    }

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#4B2876'
                    },
                    left: {
                        backgroundColor: '#4B2876'
                    }
                }}
                textStyle={{
                    left: {
                        color: '#FFFFFF'
                    },
                    left: {
                        color: '#FFFFFF'
                    }
                }}
            />
        );
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={message => sendMessage(sid, driver_id, message)}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            alwaysShowSend={true}
            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar}
            bottomOffset={280} //need to check if this work on andriod, change int to 0
        />

    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});