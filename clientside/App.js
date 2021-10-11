import { StatusBar } from "expo-status-bar";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigators/AuthNavigator";

// For socket
import SocketConnection from "./socket.js";
SocketConnection.init("https://uqpool.xyz:7777");

export default function App({ navigation }) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "android" ? -64 : 0}
          >
            <AuthNavigator />
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
