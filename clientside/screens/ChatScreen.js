import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from "react-native";
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import { selectChatMessages, selectDriver, setChatMessages } from '../slices/sessionSlice';
import { selectFirst, selectLast, selectSID } from '../slices/userSlice';
import SocketConnection from '../socket';
import { COLORS } from "../stylesheets/theme"

/**
 * App's Chat Screen
 */
const ChatScreen = () => {
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([]);
    const message_log = useSelector(selectChatMessages)
    const driver_id = useSelector(selectDriver).sid;
    const sid = useSelector(selectSID)
    let name = useSelector(selectFirst) + ' '  + useSelector(selectLast)
    connection = SocketConnection.getConnection();

    /**
     * Action of getting a message
     * @param {String} messages messages sent in a chat
     * @param {any} dispatch dispatch method
     */
    async function getMessage(messages, dispatch) {
		let new_message = await connection.recievePayload('sendMessage')
        if  (!(new_message == null)){
            setMessages(messages => GiftedChat.append(messages, new_message.message));
            new_message = null;
            dispatch(setChatMessages(messages))
            getMessage(messages, dispatch);
        }
	}

    /**
     * Action of sending a message
     * @param {String} sid UQ student ID
     * @param {Int} driver_id Unique driver ID
     * @param {String} message message sent
     */
    function sendMessage(sid, driver_id, message) {
        let data = ({
            sid: sid,
            driver_id: driver_id,
            message: message,
        });
        connection.sendPayload("sendMessage", data)
    }

    //run these functions
    useEffect(() => {
        setMessages(message_log)
        getMessage(messages, dispatch)
    }, [])

    //render frontend element
    const renderInputToolbar = (props) => {
        return (
            <InputToolbar{...props}
            //containerStyle={{ backgroundColor: '#4B2876' }}
            >
            </InputToolbar>
        )
    }

    //render frontend element
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

    //render frontend element
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
        <View style={{
            backgroundColor: COLORS.primary,
            height: "100%",
            paddingTop: 50,
        }}>
            <BackButton/>
            <GiftedChat
                messages={messages}
                onSend={message => sendMessage(sid, driver_id, message)}
                user={{
                    _id: sid,
                    name: name
                }}
                renderBubble={renderBubble}
                alwaysShowSend={true}
                renderSend={renderSend}
                renderInputToolbar={renderInputToolbar}
                bottomOffset={280} //need to check if this work on andriod, change int to 0
            />
        </View>

    );
};

//allows us to import to other pages
export default ChatScreen;

//stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});