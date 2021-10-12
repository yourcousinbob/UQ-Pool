import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatScreen = () => {

    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'STOP TALKING TO ME',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'dirver',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'whaaaat up?',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'passenger',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
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
            onSend={messages => onSend(messages)}
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